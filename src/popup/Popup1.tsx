import React, {useEffect, useState} from 'react';

function Popup1 () {

  const [num, setNum] = useState<number>(0);
  const increase = () => {
    setNum(num + 1);
  }

  useEffect(()=>{
    const opener:Window | null = window.opener;
    if(opener) {
      const $span = opener.document.querySelector('#fromPopupReceivedData')
      $span!.innerHTML = document.querySelector('#fromOpenerReceivedData')?.innerHTML || '0'
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

export default Popup1;