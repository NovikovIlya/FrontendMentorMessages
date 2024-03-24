import { useState } from "react";
import styles from "./InputComponent.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  addMessageLocal,
  addMessageLocalReply,
  sendMessage,
  sendReply,
} from "../../store/sliceUrl";

const InputComponent = ({
  text = "Reply",
  isReply = false,
  idMain = 1,
  miniInp = false,
  setShowInput,
  miniMaxInp = false,
}: any) => {
  const [textMessage, setTextMessage] = useState("");
  const [userText, setUser] = useState("");
  const dispatch = useAppDispatch();
  const { messages } = useAppSelector((state) => state.sliceUrl);

  const handleChange = (e: any) => {
    setUser(e.target.value);
  };

  const handleText = (e: any) => {
    setTextMessage(e.target.value);
  };

  const sendMessageFn = (idMain: any) => {
    if (isReply) {
      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      const year = currentDate.getFullYear();
      const formattedDate = `${day}.${month}.${year}`;

      const oldReplies = messages.findIndex((message) => message.id === idMain);
      const obj = {
        id: Math.floor(Math.random() * 1000),
        content: textMessage,
        user: {
          username: userText,
        },
        createdAt: formattedDate,
        score: 0,
      };
      const repa = [...messages[oldReplies].replies, obj];
      const dataA = { repa, mainId: idMain };
      dispatch(sendReply(dataA));
      dispatch(addMessageLocalReply(dataA));

      // скрывать поле ввода после отправки
      setShowInput(null);
      setUser("");
      setTextMessage("");
      return;
    }
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const year = currentDate.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;

    const obj = {
      content: textMessage,
      user: {
        username: userText,
      },
      createdAt: formattedDate,
    };

    dispatch(addMessageLocal(obj));
    dispatch(sendMessage(obj));
    setUser("");
    setTextMessage("");
  };

  return (
    <>
      {miniInp && <div className={styles.containerTwo}></div>}
      <div
        className={`${styles.container} ${miniInp && styles.reply} ${
          miniMaxInp && styles.miniMax
        }`}
      >
        <textarea
          rows={4}
          className={styles.inp}
          value={textMessage}
          onChange={handleText}
          placeholder="Enten text message"
        />
        <div className={styles.miniCont}>
          <input
            className={styles.inp}
            value={userText}
            onChange={handleChange}
            placeholder="Your name"
          />
          <button className={styles.btn} onClick={() => sendMessageFn(idMain)}>
            {text}
          </button>
        </div>
      </div>
    </>
  );
};

export default InputComponent;
