import React from 'react';
import {Link} from 'react-router-dom';

const UnhandledError = () => (
  <div className="bounds">
    <h1>Unexpected Error</h1>
    <p>Sorry! The server encountered an unexpected error.</p>
    <div className="button">
      <Link to='/'>Home</Link>
    </div>
  </div>
);

export default UnhandledError;