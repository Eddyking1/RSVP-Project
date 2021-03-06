import React, { Component } from "../../../node_modules/react";
import { withRouter } from "../../../node_modules/react-router-dom";
import { compose } from "recompose";
import { FormStyle } from "../../styles/GlobalStyle";
import { SignUpLink } from "../SignUp";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import { PasswordForgetLink } from "../PasswordForget";
import { LoginIcon } from "../../styles/Icons";

const SignInPage = () => (
  <div>
    <SignInForm />
  </div>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <FormStyle>
        <form onSubmit={this.onSubmit}>
          <LoginIcon />
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <input
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Lösenord"
          />
          <PasswordForgetLink />
          <SignUpLink />
          <button disabled={isInvalid} type="submit">
           Logga in
          </button>

          {error && <p>{error.message}</p>}
        </form>
      </FormStyle>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

export default SignInPage;

export { SignInForm };
