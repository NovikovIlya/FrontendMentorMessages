import { useEffect } from 'react';
import styles from '../../MainPage.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getData } from '../../store/sliceUrl';


const MainPage = () => {
  const { messages  } = useAppSelector((state) => state.sliceUrl);
  const dispatch = useAppDispatch();
  useEffect(()=>{
    dispatch(getData())
  },[])
 console.log(messages)

  return (
    <div >
      {messages?.map((item)=><div>{item.id}</div>)}
    </div>
  );
};

export default MainPage;