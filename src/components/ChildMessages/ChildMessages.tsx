import { Fragment, useState } from "react";
import styles from "./ChildMessages.module.css";
import { useAppDispatch, useAppSelector} from "../../hooks/redux";
import {  changeScoreChildLocal,  changeScoreReply } from "../../store/sliceUrl";
import InputComponent from "../InputComponent/InputComponent";
import countDayWeek from '../../utils/countDayWeek'

const ChildMessage = ({ replies, MainId }: any) => {
  const [showInput, setShowInput] = useState(null);
  const dispatch = useAppDispatch();
  const {messages} = useAppSelector((state) => state.sliceUrl)


  const changeScore = (id:number,action:string) => {
    // Ищем индекс элемента в messages, где id совпадает с id родительского элемента
    const userIndex = messages.findIndex((message) => message.id === MainId);
    // Ищем индекс элемента в replies, где id совпадает с id родительского элемента
    const replyIndex = messages[userIndex].replies.findIndex((message) => message.id === id);

    const updatedReplies = [...messages[userIndex].replies]; // Копируем replies, чтобы избежать мутации исходного объекта
    if(action === 'plus'){
      updatedReplies[replyIndex] = { ...updatedReplies[replyIndex], 
        score: updatedReplies[replyIndex].score + 1 }; // Обновляем score в реплае

    }
    if(action === 'minus'){
      updatedReplies[replyIndex] = { ...updatedReplies[replyIndex], 
        score: updatedReplies[replyIndex].score - 1 }; // Обновляем score в реплае
    }


    const updatedMessages = [...messages]; // Копируем messages
    updatedMessages[userIndex] = { ...updatedMessages[userIndex], replies: updatedReplies }; // Обновляем replies в сообщении


    const obj = {
      id:MainId,
      replies: updatedReplies
    }
    dispatch(changeScoreReply(obj))
    dispatch(changeScoreChildLocal(obj))


  };
  

  const replyFn = (id: any) => {
    setShowInput(id);
  };

  return (
    <div className={styles.mainContainer}>
      {Array.isArray(replies) && replies?.map((item: any,index) => (
        <Fragment key={index}>
          <div className={styles.containerTwo}></div>
          <div className={styles.container}>
            <div>
              <div className={styles.left}>
                <div
                  onClick={() => changeScore(item.id,'plus')}
                  className={styles.btn}
                >
                  +
                </div>
                <div className={styles.score}>{item.score}</div>
                <div
                  onClick={() => changeScore(item.id, 'minus')}
                  className={styles.btn}
                >
                  -
                </div>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.head}>
                <div className={styles.miniHead}>
                  <div className={styles.username}>{item.user.username}</div>
                  <div className={styles.date}>{countDayWeek(item.createdAt)} days ago</div>
                </div>
                <div onClick={() => replyFn(item.id)} className={styles.reply}>
                  <img className={styles.images} src="https://www.svgrepo.com/show/533707/reply.svg"/>
                  <span>Reply</span>
                </div>
              </div>
              <div className={styles.text}>{item.content}</div>
            </div>
          </div>

          {showInput === item.id && (
            <InputComponent setShowInput={setShowInput} miniInp={true} idMain={MainId} isReply={true} />
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default ChildMessage;
