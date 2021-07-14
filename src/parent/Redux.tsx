import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {GlobalState} from '../store';
import {setCounterAction} from '../store/counter';

function Redux () {

  const counter = useSelector((state: GlobalState)=>state.counter);
  const dispatch = useDispatch();
  const [num, setNum] = useState<number>(counter);

  const openPopup = () => {
    window.open('/popup2', 'popup2', 'width=300,height=300,right=0,top=0');
  }

  const increasePopupData = () => {
    dispatch(setCounterAction(counter + 1));
  }

  useEffect(() => {
    if(num !== counter) setNum(counter);
  }, [counter, num])
  
  return (
    <div>
      <div>
        <button onClick={openPopup}>팝업열기</button> 
        <br/>
        <button onClick={increasePopupData}>팝업 조작하기</button>
      </div>
      <div>
        <span id="fromPopupReceivedData">{num}</span><br/>
        현재 스테이트: {num}
      </div>
    </div>
  )
}

export default Redux;