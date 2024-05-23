import { Fragment,  useState } from "react";
import styles from "./MessageComponent.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { changeRead, changeReadAll, changeScore, changeScoreLocal } from "../../store/sliceUrl";
import InputComponent from "../InputComponent/InputComponent";
import ChildMessage from "../ChildMessages/ChildMessages";
import countDayWeek from "../../utils/countDayWeek";

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
  const readFn = (id:any)=>{
    dispatch(changeRead(id))
    console.log(id)
  }

  const readAllFn = (array:any)=>{
    console.log(array)
    const arrayMd = array.map((item:any)=>{
      return {...item, read: true};
    })
    console.log(arrayMd)
    dispatch(changeReadAll(arrayMd))
  }

  const countUnRead = () => {
    let count = 0;
    messages?.forEach((item) => {
      if (item.read === false) {
        count++;
      }
    });
    return count;
  };
  




  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>Notifications <span className={styles.countRead}>{countUnRead()}</span></h1>
        <p onClick={()=>readAllFn(messages)} className={styles.mark}>Mark all as read</p>
      </div>
      {messages?.map((item) => (
        <Fragment key={item.id}>
          <div className={`${styles.container} ${item.read===false ? styles.vb : ''}`}>
            <div>
              <div className={styles.left}>
                <div
                  onClick={() => changeScorePlus(item.id, item.score)}
                  className={styles.btn}
                >
                  +
                </div>
                <div className={styles.score}>{item.score}</div>
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
                  <div className={styles.date}>{countDayWeek(item.createdAt)} days ago</div>
                </div>
                <div onClick={ ()=>readFn(item.id)} className={styles.ss}>
                  {item.read===false && <div className={styles.read}>
                    <img className={styles.images} src="https://www.svgrepo.com/show/432275/read.svg"/>
                    <span >Read</span>
                  </div>}
                  <div onClick={()=>replyFn(item.id)} className={styles.reply}>
                    <img className={styles.images} src="https://www.svgrepo.com/show/533707/reply.svg"/>
                    <span>Reply</span>
                  </div>
                </div>
              </div>
              <div className={styles.text}>{item.content}</div>
            </div>
          </div>
          <ChildMessage replies={item.replies} MainId={item.id}/>
          {showInput === item.id && 
            <InputComponent setShowInput={setShowInput} idMain={item.id} isReply={true} miniMaxInp={true} />
          }
        </Fragment>
      ))}
      
    </>
  );
};

export default MessageComponent;
