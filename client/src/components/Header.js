/*Header- Displays the top menu bar for the application and includes buttons for signing in and 
signing up (if there's not an authenticated user) or 
the user's first and last name and a button for signing out (if there's an authenticated user). */
import React from 'react';
import { Link } from 'react-router-dom';


export default ({ context }) => {
  //accesses the authenticated user, using context
    const authUser = context.authenticatedUser;
    return (
      <div className="header">
        <div className="bounds">
          <h1 className="header--logo">Courses</h1>
          <nav>
          {/*if theren's an authorized user display a welcome message : display sign up/sign in links */}
            {authUser ?
              <React.Fragment>
                <span>Welcome, {authUser.Name}!</span>
                <Link to="/signout">Sign Out</Link>
              </React.Fragment>
            :
              <React.Fragment>
                <Link className="signup" to="/signup">Sign Up</Link>
                <Link className="signin" to="/signin">Sign In</Link>
              </React.Fragment>
            }
          </nav>
        </div>
      </div>
    );
};