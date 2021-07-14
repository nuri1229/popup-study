import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import DomControl from './parent/DomControl';
import Popup1 from './popup/Popup1';
import Main from './Main';

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Main} exact/>
          <Route path="/parent1" component={DomControl}/>
          <Route path="/popup1" component={Popup1}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
