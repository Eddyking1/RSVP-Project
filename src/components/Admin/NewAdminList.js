import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { compose } from "recompose";
import { FormStyle, Success, Button } from "../../styles/GlobalStyle";
import { withFirebase } from "../Firebase";
import { withAuthorization } from "../Session";

import * as ROUTES from "../../constants/routes";

const AdminPage = () => (
  <div>
    <h1>Admin</h1>
    <p>Welcome!</p>

    <Switch>
      <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
      <Route exact path={ROUTES.ADMIN} component={UserList} />
    </Switch>
  </div>
);

class UserListBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on("value", snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        booking: { antalKommer: 0, attending: false },
        ...usersObject[key],
        uid: key
      }));

      this.setState({
        users: usersList,
        loading: false,
        hideNotAttending: false
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  calcTotal = users => {
    if (users.length > 1) {
      console.log(users);
      return users.reduce(
        (acc, curr) => acc + parseInt(curr.booking.antalKommer),
        0
      );
    } else {
      return null;
    }
  };

  toggleShowAttending = () => {
    this.setState(prevState => ({
      hideNotAttending: !prevState.hideNotAttending
    }));
  };
  render() {
    let { users, loading, hideNotAttending } = this.state;
    if (hideNotAttending) {
      users = users.filter(user => user.booking.attending === true);
    } else {
    }
    return (
      <FormStyle>
        <div>
          <h2>Users</h2>
          {loading && <div>Loading ...</div>}
          <ul>
            {users.map(user => (
              <li key={user.uid}>
                <span>
                  <strong>En gäst </strong> {user.username}
                </span>
                {user.booking.attending ? (
                  <span> kommer, </span>
                ) : (
                  <span>
                    {" "}
                    kommer<strong> INTE, </strong>
                  </span>
                )}
                <span>
                  <strong>och tar med sig: </strong>
                  {user.booking.antalKommer} antal gäster.
                </span>

                <span>
                  <Link
                    to={{
                      pathname: `${ROUTES.ADMIN_DETAILS}/${user.uid}`,
                      state: { user }
                    }}
                  >
                    Details
                  </Link>
                </span>
              </li>
            ))}
          </ul>
          <div>
            <span>
              <br />
              <strong>Totalt kommer det: {this.calcTotal(users)}</strong> gäster
              på festen!
            </span>
            <span>
              <br />
              <strong>
                Tryck här för att växla mellan visa alla/visa gäster
              </strong>
              <button onClick={() => this.toggleShowAttending()}>VÄXLA</button>
            </span>
          </div>
        </div>
      </FormStyle>
    );
  }
}

class UserItemBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      user: null,
      ...props.location.state
    };
  }

  componentDidMount() {
    if (this.state.user) {
      return;
    }

    this.setState({ loading: true });

    this.props.firebase
      .user(this.props.match.params.id)
      .on("value", snapshot => {
        this.setState({
          user: snapshot.val(),
          loading: false
        });
      });
  }

  componentWillUnmount() {
    this.props.firebase.user(this.props.match.params.id).off();
  }

  onSendPasswordResetEmail = () => {
    this.props.firebase.doPasswordReset(this.state.user.email);
  };

  render() {
    const { user, loading } = this.state;

    return (
      <div>
        <h2>User ({this.props.match.params.id})</h2>
        {loading && <div>Loading ...</div>}

        {user && (
          <div>
            <span>
              <strong>Username:</strong> {user.username}
            </span>
            <span>
              <strong>E-Mail:</strong> {user.email}
            </span>
            <span>
              <strong>Attending:</strong> {user.booking.attending}
            </span>
            <span>
              <strong>antalKommer:</strong> {user.booking.antalKommer}
            </span>

            <span>
              <button type="button" onClick={this.onSendPasswordResetEmail}>
                Send Password Reset
              </button>
            </span>
          </div>
        )}
      </div>
    );
  }
}

const UserList = withFirebase(UserListBase);
const UserItem = withFirebase(UserItemBase);

const condition = authUser => !!authUser;

export default compose(withAuthorization(condition))(AdminPage);
