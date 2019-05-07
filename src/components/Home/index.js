import React, { Component } from "react";
import { compose } from 'recompose';
import { withAuthorization, } from '../Session';
import { withFirebase } from '../Firebase';
import styled, { keyframes } from 'styled-components';
import Confetti from 'react-confetti';
import * as ROUTES from "../../constants/routes";



const Wrapper = styled.div `
width:100vw;
display:flex;
justify-content:center;
align-items:center;
align-content: center;
flex-direction:column;
padding: 50px 0;
overflow: hidden;

button {
    z-index:999999;
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

*{
  background-attachment: fixed;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
}

`;

const DonyasPicture = styled.img `
    width:70%;
    height:650px;
`;




class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicks: 0,
      conffettiEnabled: true,
    };

    this.handleClick = this.handleClick.bind(this);
  }



  handleClick() {
        this.props.history.push(ROUTES.OSA);

  } 
  
  handleSlider() {
    this.setState((prevState) => ({
      currentSlider: prevState.currentSlider += 1,
   }
   ));
  }


  render() {
 
    return (
     <Wrapper> 
      <Confetti ref="Confetti"/>  
        <DonyasPicture src={require('../../assets/donyas.jpg')}/>
        <button onClick={this.handleClick} >OSA här!</button>
     </Wrapper>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withAuthorization(condition),
)(HomePage);
