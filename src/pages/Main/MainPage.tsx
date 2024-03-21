import styles from '../../MainPage.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';


const MainPage = () => {
  const { messages  } = useAppSelector((state) => state.sliceUrl);
  const dispatch = useAppDispatch();

 console.log(messages)

  return (
    <div >
      {messages?.map((item)=><div>{item.id}</div>)}
    </div>
  );
};

export default MainPage;