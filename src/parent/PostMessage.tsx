import React, {useRef, useState, useLayoutEffect, useEffect} from 'react';

const origin = "http://localhost:3001";

function PostMessage () {

  const [num, setNum] = useState<number>(0);
  const popupRef = useRef<Window | null>();
  
  const openPopup = () => {
    popupRef.current = window.open('/popup4', 'popup4', 'width=300,height=300,right=0,top=0');
  }

  const increasePopupData = () => {
    setNum(num + 1);
  }

  useEffect(() => {
    window.addEventListener("message", (event) => {
      if (event.origin !== origin) return;
      if (event.data.source === "popup" && event.data.count) setNum(event.data.count);
    })
  }, [])

  useEffect(() => {
    if (popupRef.current) popupRef.current.postMessage({
      source: "opener",
      count: num
    }, "http://localhost:3001");
  }, [num]);

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

export default PostMessage;