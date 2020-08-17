import React, { Component } from "react";
import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Session";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import HomePage from "../Home";
import RSVPOSA from "../OSA";
import Admin from "../Admin/NewAdminList.js";
import CreateCustomOSA from "../OSA/CreateCustomOSA.js";
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
        <div key={"RSVP"}>
          <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          <Route exact path={ROUTES.OSA} component={RSVPOSA} />
          <Route exact path={ROUTES.CREATE_OSA} component={CreateCustomOSA} />
          <Route exact path={ROUTES.LANDING} component={HomePage} />
          <Route exact path={ROUTES.ADMIN} component={Admin} />
        </div>
      </Router>
    );
  }
}

export default withAuthentication(App);
