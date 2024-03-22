import { Fragment,  useState } from "react";
import styles from "./MessageComponent.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { changeScore, changeScoreLocal } from "../../store/sliceUrl";
import InputComponent from "../InputComponent/InputComponent";
import ChildMessage from "../ChildMessages/ChildMessages";

const MessageComponent = () => {
  const [showInput, setShowInput] = useState(null);
  const { messages } = useAppSelector((state) => state.sliceUrl);
  const dispatch = useAppDispatch();
  const changeScorePlus = (id: number, score: number) => {
    const obj = {
      id,
      score: score + 1,
    };
    dispatch(changeScoreLocal(obj));
    dispatch(changeScore(obj));
  };
  const changeScoreMinus = (id: number, score: number) => {
    const obj = {
      id,
      score: score - 1,
    };
    dispatch(changeScoreLocal(obj));
    dispatch(changeScore(obj));
  };

  const replyFn = (id:any)=>{
    setShowInput(id);
  }


  return (
    <>
      {messages?.map((item) => (
        <Fragment key={item.id}>
          <div className={styles.container}>
            <div>
              <div className={styles.left}>
                <div
                  onClick={() => changeScorePlus(item.id, item.score)}
                  className={styles.btn}
                >
                  +
                </div>
                <div>{item.score}</div>
                <div
                  onClick={() => changeScoreMinus(item.id, item.score)}
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
                <div onClick={()=>replyFn(item.id)} className={styles.reply}>
                   <img className={styles.images} src="https://www.svgrepo.com/show/533707/reply.svg"/>
                  <span>Reply</span>
                </div>
              </div>
              <div className={styles.text}>{item.content}</div>
            </div>
          </div>
          <ChildMessage replies={item.replies} MainId={item.id}/>
          {showInput === item.id && 
            <InputComponent idMain={item.id} isReply={true}/>
          }
        </Fragment>
      ))}
      
    </>
  );
};

export default MessageComponent;
