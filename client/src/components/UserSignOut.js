//This component signs out a user while using context and redirects the user to the default page
import React, { useEffect} from 'react';
import { Redirect } from 'react-router-dom';

export default ({ context }) => {
  useEffect(() =>  context.actions.signOut());

  return (
    <Redirect to="/" />
  );
}
