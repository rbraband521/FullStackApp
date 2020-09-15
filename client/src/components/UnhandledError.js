import React from 'react';
import {Link} from 'react-router-dom';

export default () => (
  <div className="bounds">
    <h1>Not Found</h1>
    <p>Sorry! The server encountered an unexpected error.</p>
    <div className="button">
      <Link to='/'>Home</Link>
    </div>
  </div>
);