import React from 'react';
import {Link} from 'react-router-dom';


function Main () {

  return (
    <div>
      <h1>React에서 팝업 사용하기</h1>
      <h2>popup-opener 커뮤니케이션</h2>
      <ul>
          <li>
            <Link to="/parent1">dom 직접 조작</Link>
          </li>
          <li>
            <Link to="/parent2">Redux</Link>
          </li>
          <li>
            <Link to="/parent3">window Object</Link>
          </li>
          <li>
            <Link to="/parent4">postMessage</Link>
          </li>
          <li>
            <Link to="/parent5">localStorage</Link>
          </li>
      </ul>
    </div>
  )
}
export default Main;