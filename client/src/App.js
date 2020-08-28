import React, { Component } from 'react';
import { 
  Switch,
  BrowserRouter,
  Route, } from 'react-router-dom';
import './App.css';


//componenet import
import withContext from './Context';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';


const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
// const CoursesWithContext = withContext(Courses);
// const CourseDetailWithContext = withContext(CourseDetail);



class App extends Component {
  
  render () {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path= '/' component={Courses} />
            <Route path= '/courses/:id' component={CourseDetail} />
            <Route path="/signin" component={UserSignInWithContext} />
            <Route path="/signup" component={UserSignUpWithContext} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default (App);