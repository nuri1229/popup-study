import React, {useState, useEffect} from 'react';

const origin = "http://localhost:3001";

function Popup5 () {

  const [num, setNum] = useState<number>(0);

  const increase = () => {
    setNum(num + 1);
  }

  useEffect(() => {
    window.addEventListener("storage", (event) => {
      if (event.key === 'CHANGED_COUNT' && event.newValue && event.newValue !== `${num}`) {
        setNum(Number(localStorage.getItem("CHANGED_COUNT")));
      }
    })
  }, [])

  useEffect(() => {
    localStorage.setItem("CHANGED_COUNT", `${num}`);
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

export default Popup5;