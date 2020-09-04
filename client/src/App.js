import React from 'react';
import { 
  Switch,
  BrowserRouter,
  Route,
  Redirect } from 'react-router-dom';
import './App.css';


//componenet import
import withContext from './Context';
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';

const HeaderWithContext = withContext(Header); 
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);



export default () => (
  <BrowserRouter>
    <div>
      <HeaderWithContext />
      
      <Switch>
        <Route exact path= '/' render={ () => <Redirect to ='/courses' />} />
        <Route exact path= '/courses' component={CoursesWithContext} />
        <Route path= '/courses/:id' component={CourseDetailWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
      </Switch>
    </div>
  </BrowserRouter>
);


