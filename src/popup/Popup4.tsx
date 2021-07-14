import React, {useState, useEffect} from 'react';

const origin = "http://localhost:3001";

function Popup4 () {

  const [num, setNum] = useState<number>(0);

  const increase = () => {
    setNum(num + 1);
  }

  useEffect(() => {
    window.addEventListener('message', (event) => {
      if (event.origin !== origin) return;
      if (event.data.source === "opener" && event.data.count) setNum(event.data.count);
    })
  }, []);

  useEffect(() => {
    if(window.opener) {
      (window.opener as Window).postMessage({
        source: 'popup',
        count: num
      }, "http://localhost:3001")
    }
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

export default Popup4;