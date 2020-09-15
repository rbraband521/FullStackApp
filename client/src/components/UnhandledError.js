/*This component renders an Unexpected Error page when the server encounters an error
The path will be /error and will only render when there is a 500 status code error from the API */

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