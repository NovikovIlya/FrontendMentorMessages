import { Fragment, useEffect } from "react";
import styles from "./MessageComponent.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getData } from "../../store/sliceUrl";

const MessageComponent = () => {
  const { messages } = useAppSelector((state) => state.sliceUrl);
  const dispatch = useAppDispatch();

  return (
    <>
      {messages?.map((item) => (
        <Fragment key={item.id}>
          <div>
            <div className={styles.left}>
                <div className={styles.btn}>+</div>
                <div>{item.score}</div>
                <div className={styles.btn}>-</div>
            </div>
            <div className={styles.right}>
              <div className={styles.head}>
                <div className={styles.username}>{item.user.username}</div>
                <div className={styles.date}>{item.createdAt}</div>
                <div className={styles.reply}>Reply</div>
              </div>
              <div className={styles.text}>{item.content}</div>
            </div>
          </div>
        </Fragment>
      ))}
    </>
  );
};

export default MessageComponent;
