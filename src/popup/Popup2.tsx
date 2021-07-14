import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {GlobalState} from '../store';
import {setCounterAction} from '../store/counter';

function Popup2 () {

  const counter = useSelector((state: GlobalState)=>state.counter);
  const dispatch = useDispatch();
  const [num, setNum] = useState<number>(counter);

  const sendToOpener = () => {
    dispatch(setCounterAction(counter + 1));
  }

  useEffect(() => {
    if(num !== counter) setNum(counter);
  }, [counter, num])

  return (
    <>
      <span id="fromOpenerReceivedData">{num}</span>
      <span>현재 스테이트: {num}</span>
      <br/>
      <button onClick={sendToOpener}>state 넘기기</button>
    </>
  )
}

export default Popup2;