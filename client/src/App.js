import React, { Component } from 'react';
// import '../styles/global.css';
import { 
  Switch,
  BrowserRouter,
  Route, } from 'react-router-dom';
import './App.css';

//componenet import
import Courses from './components/Courses';


class App extends Component {
  
  render () {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path= '/' render={ () => <Courses />} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default (App);