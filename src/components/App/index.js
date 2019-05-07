import React, { Component } from "react";
import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Session";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import HomePage from "../Home";
import OSA from "../OSA";
import PasswordForgetPage from "../PasswordForget";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { GlobalStyle } from "../../styles/GlobalStyle";
import Navigation from "../Navigation";

class App extends Component {
  state = {
    open: false
  };

  sidebarToggleClickHandler = e => {
    e.preventDefault();
    if (e.target.tagName !== "UL") {
      this.setState(prevState => ({ open: !prevState.open }));
    }
  };

  render() {
    const { open } = this.state;

    return (
      <Router>
        <GlobalStyle />
        <Navigation
          sidebarToggleClickHandler={this.sidebarToggleClickHandler}
          open={open}
        />
        <div>
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          <Route path={ROUTES.OSA} component={OSA} />
          <Route path={ROUTES.LANDING} component={HomePage} />
        </div>
      </Router>
    );
  }
}

export default withAuthentication(App);
