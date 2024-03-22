import React, { useState } from "react";
import styles from "./InputComponent.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { addMessageLocal, sendMessage, sendReply } from "../../store/sliceUrl";

const InputComponent = ({ text = "Send" , isReply = false,idMain=1}) => {

  const [textMessage, setTextMessage] = useState("");
  const [userText, setUser] = useState("");
  const [replyCLick,isReplyClick] = useState(false)
  const dispatch = useAppDispatch();
  const {messages} = useAppSelector((state) => state.sliceUrl)

  const handleChange = (e:any) => {
    setUser(e.target.value);
  };

  const handleText = (e:any)=>{
    setTextMessage(e.target.value)
  }

  const sendMessageFn = (idMain:any) => {
    if(isReply){
      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
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
       
      };
      const repa = [...messages[oldReplies].replies,obj]
      const dataA = {repa,mainId:idMain}
      dispatch(sendReply(dataA))
      console.log(obj)
      
      return
    }
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;

    const obj = {
      content: textMessage,
      user: {
        username: userText,
      },
      createdAt: formattedDate,
    };
    console.log(obj)
    dispatch(addMessageLocal(obj))
    dispatch(sendMessage(obj))
  };
  return (
    <div className={`${styles.container} `}>
      <input value={textMessage} onChange={handleText} placeholder="Enten text message" />
      <div >
        <input value={userText} onChange={handleChange} placeholder="Your name" />
        <button onClick={()=>sendMessageFn(idMain)}>{text}</button>
      </div>
    </div>
  );
};

export default InputComponent;
