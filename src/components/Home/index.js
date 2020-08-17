import React, { Component } from "react";
import { compose } from "recompose";
import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";
import * as ROUTES from "../../constants/routes";
/* import PDF from "../PDF"; */
import OSA from "../OSA";

const Wrapper = styled.div`
  width: 100vw;
  height: calc(100vh);
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-direction: column;
  padding: 50px 0;
  overflow: hidden;
  z-index:9999999;
  button {
    padding: 0.5em 1.5em;
    margin: 2em 0;
    border: none;
    outline: none;
    background: var(--text-color);
    color: white;
    font-size: 2em;
    font-weight: bold;
    border-radius: 0.1em;
    transition: 0.3s;
    cursor: pointer;
    &:hover {
      transform: scale(1.04);
    }
  }

  * {
    background-attachment: fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }
`;

const HomeDiv = styled.div`
  display:flex;
  justify-content:center;
  text-align: center;
  align-content:center;
  flex-direction:column;
`;

const Home = () => (
  <div>
    <HomeP/>
  </div>
);

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicks: 0,
      conffettiEnabled: true
    };
  }
  render() {
    return (
      <Wrapper>
        <HomeDiv>
          <Link to={ROUTES.CREATE_OSA}> <h1>Create new RSVP</h1> </Link>
        </HomeDiv>
      </Wrapper>
    );
  }
}

const condition = authUser => !!authUser;

const HomeP = compose(
  withFirebase,
  withAuthorization(condition)
)(HomePage);

export default Home;

export { HomeP }
