import React, {useRef, useState, useLayoutEffect, useEffect} from 'react';

function WindowObject () {

  const [num, setNum] = useState<number>(0);
  const popupRef = useRef<Window | null>();
  
  const openPopup = () => {
    popupRef.current = window.open('/popup3', 'popup3', 'width=300,height=300,right=0,top=0');
    if(popupRef.current) {
      (popupRef.current as any)['setOpenerCount'] = (count:number) => {
        setNum(count);
      }
    }
  }

  const increasePopupData = () => {
    setNum(num + 1);
  }

  useEffect(() => {
    if (popupRef.current && (popupRef.current as any)['setPopupCount']) {
      (popupRef.current as any)['setPopupCount'](num);
    }
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

export default WindowObject;