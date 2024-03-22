import { Fragment, useState } from "react";
import styles from "./ChildMessages.module.css";
import { useAppDispatch, useAppSelector} from "../../hooks/redux";
import { changeScore, changeScoreChildLocal, changeScoreLocal, changeScoreReply } from "../../store/sliceUrl";
import InputComponent from "../InputComponent/InputComponent";

const ChildMessage = ({ replies, MainId }: any) => {
  const [showInput, setShowInput] = useState(null);
  const dispatch = useAppDispatch();
  const {messages} = useAppSelector((state) => state.sliceUrl)
  console.log(MainId)

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
    console.log(updatedMessages)

    const obj = {
      id:MainId,
      replies: updatedReplies
    }
    dispatch(changeScoreReply(obj))
    dispatch(changeScoreChildLocal(obj))
    // dispatch(changeScoreLocal(obj));

  };
  

  const replyFn = (id: any) => {
    setShowInput(id);
  };
  console.log(replies)
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
                <div>{item.score}</div>
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
                  <div className={styles.date}>{item.createdAt}</div>
                </div>
                <div onClick={() => replyFn(item.id)} className={styles.reply}>
                  Reply
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
