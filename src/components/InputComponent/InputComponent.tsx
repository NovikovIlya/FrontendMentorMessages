import React, { useState } from "react";
import styles from "./InputComponent.module.css";
import { useAppDispatch } from "../../hooks/redux";
import { addMessageLocal, sendMessage } from "../../store/sliceUrl";

const InputComponent = ({ text = "Send" }) => {
  const [textMessage, setTextMessage] = useState("");
  const [user, setUser] = useState("");
  const dispatch = useAppDispatch()

  const handleChange = (e:any) => {
    setUser(e.target.value);
  };

  const handleText = (e:any)=>{
    setTextMessage(e.target.value)
  }

  const sendMessageFn = () => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;

    const obj = {
      content: textMessage,
      user: {
        username: user,
      },
      createdAt: formattedDate,
    };
    dispatch(addMessageLocal(obj))
    dispatch(sendMessage(obj))
  };
  return (
    <div className={styles.container}>
      <input onChange={handleText} placeholder="Enten text message" />
      <div >
        <input onChange={handleChange} placeholder="Your name" />
        <button onClick={sendMessageFn}>{text}</button>
      </div>
    </div>
  );
};

export default InputComponent;
