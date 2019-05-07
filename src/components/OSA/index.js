import React, { Component } from 'react';
import { compose } from 'recompose';
import { withAuthorization, } from '../Session';
import { withFirebase } from '../Firebase';
import {FormStyle, Success} from '../../styles/GlobalStyle';
import * as ROUTES from "../../constants/routes";

class OSA extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      success:false,
      attending:true,
      antalKommer:0,
    };
  }




  onSubmit = (event) => {
    this.setState({
        success: true
      });
    const { attending, antalKommer} = this.state;

    this.props.firebase.bookings().push({
      bokare:this.props.authUser.email,
      attending:this.state.antalKommer,
      kommer:this.state.attending,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    }) .then( () =>{ 
      
        this.props.history.push(ROUTES.HOME);
    }) 

    
    
    event.preventDefault();
  };
 
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({
        success: false
      });
      console.log(this.state);

  }

  render() {
    const {attending ,antalKommer} = this.state;

    const isInvalid = antalKommer === '';

    return (
      <div>
      {this.state.success ? (
          <Success>bokningen har skickats!</Success>
        ) : null}
        { !this.state.loading ?
          <FormStyle fullWidth>
            <form onSubmit={this.onSubmit}>
            <ul> 

            <li> 
            <p>Hur många tar du med dig?</p>
            <input 
            name="antalKommer" 
            type="number" 
            max="10" 
            min="0" 
            value={antalKommer}
            onChange={this.onChange}
            />
            </li>

            </ul>
              <button type="submit">
                Boka!
              </button>
            </form>
          </FormStyle>
          : <h1>Webbsidan laddar...</h1> }
        </div>
      );
    }
  }

  const condition = authUser => !!authUser;

  export default compose(
    withFirebase,
    withAuthorization(condition),
  )(OSA);
