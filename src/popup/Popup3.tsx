import React, {useState, useEffect} from 'react';

function Popup3 () {

  const [num, setNum] = useState<number>(0);

  const increase = () => {
    setNum(num + 1);
  }

  useEffect(() => {
    (window as any)['setPopupCount'] = (count:number) => {
      setNum(count);
    }
  }, []);

  useEffect(() => {
    (window as any)['setOpenerCount'](num);
  }, [num]);



  return (
    <>
      <span id="fromOpenerReceivedData">{num}</span>
      <span>현재 스테이트: {num}</span>
      <br/>
      <button onClick={increase}>increase</button>
    </>
  )
}

export default Popup3;