import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import DomControl from './parent/DomControl';
import Popup1 from './popup/Popup1';
import Main from './Main';
import Redux from './parent/Redux';
import Popup2 from './popup/Popup2';
import WindowObject from './parent/WindowObject';
import Popup3 from './popup/Popup3';
import PostMessage from './parent/PostMessage';
import Popup4 from './popup/Popup4';
import LocalStorageComp from './parent/LocalStorageComp';
import Popup5 from './popup/Popup5';

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Main} exact/>
          <Route path="/parent1" component={DomControl}/>
          <Route path="/popup1" component={Popup1}/>
          <Route path="/parent2" component={Redux}/>
          <Route path="/popup2" component={Popup2}/>
          <Route path="/parent3" component={WindowObject}/>
          <Route path="/popup3" component={Popup3}/>
          <Route path="/parent4" component={PostMessage}/>
          <Route path="/popup4" component={Popup4}/>
          <Route path="/parent5" component={LocalStorageComp}/>
          <Route path="/popup5" component={Popup5}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
