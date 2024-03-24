import {  useEffect } from "react";
import styles from "./MainPage.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getData } from "../../store/sliceUrl";
import MessageComponent from "../../components/MessageComponent/MessageComponent";
import InputComponent from "../../components/InputComponent/InputComponent";

const MainPage = () => {
  const dispatch = useAppDispatch();
  const {isError, isLoad} = useAppSelector((state) => state.sliceUrl);

  useEffect(() => {
    dispatch(getData());
  }, []);

  if(isLoad){
    return <div className={styles.container}>Loading...</div>
  }

  if(isError){  
    return <div className={styles.container}>Something went wrong</div>
  }

  return (
    <div className={styles.container}>
      <MessageComponent />
      <InputComponent text="Send" />
    </div>
  );
};

export default MainPage;
