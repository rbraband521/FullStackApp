/**UserSignIn - This component provides the "Sign In" screen by rendering a form that 
 * allows a user to sign using their existing account information. 
 * The component also renders a "Sign In" button that when clicked signs in the user and a "Cancel"
 *  button that returns the user to the default route (i.e. the list of courses) */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignIn extends Component {
    state = {
        emailAddress: '',
        password: '',
        errors: []
    }
    render() {
        const {
          emailAddress,
          password,
          errors,
        } = this.state;
        //user sign in form, also renders a sign up link for non-users
        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                <Form 
                    cancel={this.cancel}
                    errors={errors}
                    submit={this.submit}
                    submitButtonText="Sign In"
                    elements={() => (
                    <React.Fragment>
                        <input 
                            id="emailAddress" 
                            name="emailAddress" 
                            type="text"
                            value={emailAddress} 
                            onChange={this.change} 
                            placeholder="Email Address" />
                            <input 
                            id="password" 
                            name="password"
                            type="password"
                            value={password} 
                            onChange={this.change} 
                            placeholder="Password" />                
                    </React.Fragment>
                    )} />
                <p>
                    Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
                </p>
            </div>
        </div>
    );
  }
  /*The change function is called in the form above whenever an input is changed
  This controls each element based on the name attribute*/
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const { context } = this.props;
    //stores the previous location so the user can be redirected if they were originally redirected to the sign in page
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { emailAddress, password } = this.state;
    context.actions.signIn(emailAddress, password)
    .then( user => {
      if (user === null) {
        this.setState(() => {
          return { errors: [ 'Sign-in was unsuccessful' ] };
        });
        } else {
          //redirects user to the previous location
          this.props.history.push(from);
          console.log(`SUCCESS! ${emailAddress} is now signed in!`);
      }
    }) //500 status handling
      .catch( err => {
        console.log(err);
        this.props.history.push('/error');
      })
  }
//cancel button will return you to the home page
  cancel = () => {
    this.props.history.push('/');
  }
}
