/*This component renders a Not Found error page when the requested page cannont be found.
This will be rendered if NO OTHER routes can be matched in App.js
This will also be rendered when a specific course id cannot be found in the database */

import React from 'react';
import {Link} from 'react-router-dom';

export default () => (
  <div className="bounds">
    <h1>Not Found</h1>
    <p>Sorry! We couldn't find the course you're looking for.</p>
    <div className="button">
      <Link to='/'>Home</Link>
    </div>
  </div>
);