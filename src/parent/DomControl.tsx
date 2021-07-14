import React, {useRef, useState, useLayoutEffect} from 'react';

function DomControl () {

  const [num, setNum] = useState<number>(0);
  const popupRef = useRef<Window | null>();
  
  const openPopup = () => {
    popupRef.current = window.open('/popup1', 'popup1', 'width=300,height=300,right=0,top=0');
  }

  const increasePopupData = () => {
    if (popupRef.current) {
      const $span = popupRef.current.document.querySelector('#fromOpenerReceivedData');
      if($span && $span.innerHTML) {
        $span.innerHTML = `${Number($span?.innerHTML) + 1}`;
      }
      
    }
  }

  return <div style={{width:'50%'}}>
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
}

export default DomControl;