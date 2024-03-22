import { Fragment, useEffect, useState } from "react";
import styles from "./ChildMessages.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getData } from "../../store/sliceUrl";
import { changeScore, changeScoreLocal } from "../../store/sliceUrl";
import InputComponent from "../InputComponent/InputComponent";

const ChildMessage = ({replies}:any) => {
  const [replyClick, setReplyClick] = useState(false);
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
    <div className={styles.mainContainer}>
    {/* <div className={styles.containerTwo}></div> */}
      {replies?.map((item:any) => (
        <Fragment key={item.id}>
            <div className={styles.containerTwo}></div>
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
                <div onClick={()=>replyFn(item.id)} className={styles.reply}>Reply</div>
              </div>
              <div className={styles.text}>{item.content}</div>
            </div>
          </div>
          
          {showInput === item.id && 
          <InputComponent idMain={item.id} isReply={true}/>
          }
        </Fragment>
      ))}
      
    </div>
  );
};

export default ChildMessage;
