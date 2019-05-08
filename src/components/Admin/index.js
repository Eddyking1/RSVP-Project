import React, { Component } from "../../../node_modules/react";
import { withRouter } from "../../../node_modules/react-router-dom";
import { compose } from "recompose";
import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import { FormStyle } from "../../styles/GlobalStyle";
import { SignUpLink } from "../SignUp";
import { BookList } from "../Admin/AdminItem.js";

class Admin extends Component {
  state = { loading: true, uid: null, bookings: null, total: null };
  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on("value", snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key
      }));

      this.setState({
        users: usersList,
        loading: false
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  //   componentDidMount() {
  //     // const {
  //     //   authUser: { uid: userID }
  //     // } = this.props;

  //     this.setState({ loading: true });
  //     this.props.firebase.users.on("value", snapshot => {
  //       const usersObject = snapshot.val();
  //       if (usersObject) {
  //         const usersList = Object.keys(usersObject).map(key => ({
  //           ...usersObject[key],
  //           uid: key
  //         }));
  //         const bookings = usersList.reduce(
  //           (acc, cur) => acc + cur.antalKommer,
  //           0
  //         );
  //         const details = usersList.map(user => ({ ...user.bookings }));

  //         this.setState({
  //           bookings: details,
  //           total: bookings,
  //           loading: false
  //         });
  //       } else {
  //         this.setState({ bookings: null, total: null, loading: false });
  //       }
  //       //   this.setState(
  //       //     (messageObject ? { loading: false } : { messages: null, loading: false })
  //       //   );
  //     });
  //   }
  render() {
    const { users, total, loading } = this.state;
    return <div>{loading ? null : <BookList users={users} />}</div>;
  }
}

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withAuthorization(condition)
)(Admin);
