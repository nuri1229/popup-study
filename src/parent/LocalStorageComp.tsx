import React, {useRef, useState, useLayoutEffect, useEffect} from 'react';

function LocalStorageComp () {

  const [num, setNum] = useState<number>(0);
  const popupRef = useRef<Window | null>();
  
  const openPopup = () => {
    popupRef.current = window.open('/popup5', 'popup5', 'width=300,height=300,right=0,top=0');
  }

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
    <div>
      <div>
        <button onClick={openPopup}>팝업열기</button> 
        <br/>
        <button onClick={increase}>increase</button>
      </div>
      <div>
        <span id="fromPopupReceivedData">{num}</span><br/>
        현재 스테이트: {num}
      </div>
    </div>
  )
}

export default LocalStorageComp;