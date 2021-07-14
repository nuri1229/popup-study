import React from 'react';
import {Link} from 'react-router-dom';


function Main () {

  return (
    <div>
      <h1>React에서 팝업 사용하기</h1>
      <h2>popup-opener 커뮤니케이션</h2>
      <ul>
          <li><Link to="/parent1">dom에 접근</Link></li>
          <li>setState</li>
          <li>action</li>
          <li>context</li>
          <li>window</li>
          <li>message</li>
          <li>localStorage</li>
          <li>observe</li>
      </ul>
    </div>
  )
}
export default Main;