import React, { Component } from 'react';
// import '../styles/global.css';
import { 
  Switch,
  BrowserRouter,
  Route, } from 'react-router-dom';
import './App.css';


//componenet import
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';



class App extends Component {
  
  render () {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path= '/' render={ () => <Courses />} />
            <Route path= '/courses/:id' render={ () => <CourseDetail />} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default (App);