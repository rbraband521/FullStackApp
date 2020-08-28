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
import UserSignIn from './components/UserSignIn';
import withContext from './Context';


const UserSignInWithContext = withContext(UserSignIn);


class App extends Component {
  
  render () {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path= '/' component={Courses} />
            <Route path= '/courses/:id' component={CourseDetail} />
            <Route path="/signin" component={UserSignInWithContext} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default (App);