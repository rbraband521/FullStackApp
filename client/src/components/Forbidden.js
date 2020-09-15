/**This component renders a message letting the user know an unexpected error form the server
 * has occurred. It also renders a button to return to the home screen*/

import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    return (
      <div className="bounds">
        <h1>Forbidden</h1>
        <p>Sorry, you must be the course creator in order to update.</p>
        <div className="button">
          <Link to="/">Return Home</Link>
        </div>
      </div>
    )
  }