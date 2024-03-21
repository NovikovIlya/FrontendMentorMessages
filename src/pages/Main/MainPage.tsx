import { Fragment, useEffect } from 'react';
import styles from './MainPage.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getData } from '../../store/sliceUrl';
import MessageComponent from '../../components/MessageComponent/MessageComponent';
import InputComponent from '../../components/InputComponent/InputComponent';


const MainPage = () => {
  
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(getData())
  },[])
 

  return (
    <div >
     <MessageComponent/>
     <InputComponent/>
    </div>
  );
};

export default MainPage;