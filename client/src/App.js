import React from 'react';
import { 
  Switch,
  BrowserRouter,
  Route,
  Redirect } from 'react-router-dom';
import './App.css';


//component import
import withContext from './Context';
import PrivateRoute from './PrivateRoute';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';
//Adding context to stateful components
const HeaderWithContext = withContext(Header); 
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);



//Route handling: if no other routes match, NotFound will be returned
export default () => (
  <BrowserRouter>
    <div>
      <HeaderWithContext />
      
      <Switch>
        <Route exact path= '/' render={ () => <Redirect to ='/courses' />} />
        <Route exact path= '/courses' component={CoursesWithContext} />
        <PrivateRoute path= '/courses/create' component={CreateCourseWithContext} />
        <PrivateRoute path='/courses/:id/update' component={UpdateCourseWithContext} />
        <Route path= '/courses/:id' component={CourseDetailWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route path="/forbidden" component={Forbidden} />
        <Route path="/error" component={UnhandledError} />
        <Route path="/notfound" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
);


