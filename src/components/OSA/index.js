import React, { Component } from "react";
import { compose } from "recompose";
import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import { FormStyle, Success, Button } from "../../styles/GlobalStyle";
import * as ROUTES from "../../constants/routes";

const RSVPOSA = () => (
  <div>
    <OSA />
  </div>
);

class OSA extends Component {
  state = {
    loading: true,
    success: false,
    attending: false,
    antalKommer: 0,
    thankYou: false
  };
  handleFocus = event => event.target.select();

  clearThankYou = () => {
    this.setState({ thankYou: false });
  };

  onSubmit = event => {
    this.setState({
      thankYou: true
    });
    setTimeout(this.clearThankYou, 2000);
    event.preventDefault();
  };

  onChange = event => {
    const { target } = event;
    const { attending, antalKommer } = this.state;
    switch (event.target.type) {
      case "checkbox":
        this.setState(
          (prevState, props) => ({ [target.name]: target.checked }),
          () => {
            this.props.firebase.user(this.props.authUser.uid).update({
              booking: {
                [target.name]: target.checked
              }
            });
          }
        );

        break;
      case "number":
        if (event.target.value === "") event.target.value = 0;
        this.setState(
          (prevState, props) => ({
            attending: true,
            [target.name]: target.value
          }),
          () => {
            this.props.firebase.user(this.props.authUser.uid).update({
              booking: {
                [target.name]: target.value,
                attending: true
              }
            });
          }
        );
        break;
    }
  };
  componentDidMount() {
    const {
      authUser: { uid: userID }
    } = this.props;

    this.props.firebase
      .user(userID)
      .once("value")
      .then(snapshot => {
        const { booking } = snapshot.val();
        if (booking) {
          this.setState({ ...booking, loading: false });
          //console.log(userObject.booking);
        } else {
          this.setState({ loading: false });
        }
      });
  }

  render() {
    const { attending, antalKommer } = this.state;

    const isInvalid = antalKommer === "";

    return (
      <div key={"OSA"}>
        {this.state.thankYou ? <Success>Tack, välkomna!</Success> : null}
        {this.state.loading ? (
          <h1>Vänta ett ögonblick...</h1>
        ) : (
            [
              <FormStyle fullWidth key={"Form"}>
                <form onSubmit={this.onSubmit}>
                  <input
                    name="attending"
                    type="checkbox"
                    checked={attending}
                    onChange={this.onChange}
                  />
                  <p>Hur många tar du med dig?</p>
                  <input
                    name="antalKommer"
                    type="number"
                    max="10"
                    min="0"
                    value={antalKommer}
                    onChange={this.onChange}
                    onFocus={this.handleFocus}
                  />
                  
                  {this.state.thankYou ? (
                    <Button type="submit">Sparat</Button>
                  ) : (
                      <button type="submit">Spara</button>
                    )}
                </form>
              </FormStyle>
            ]
          )}
      </div>
    );
  }
}

const condition = authUser => !!authUser;

const RSVP = compose(
  withFirebase,
  withAuthorization(condition)
)(OSA);

export default RSVPOSA;
export { RSVP };
