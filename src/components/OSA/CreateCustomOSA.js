import React, { Component } from "react";
import { compose } from "recompose";
import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import styled, { keyframes } from "styled-components";
import { FormStyle, Success, Button } from "../../styles/GlobalStyle";
import * as ROUTES from "../../constants/routes";

const Wrapper = styled.div`
    height: 100vh;
    display:flex;
    justify-content:center;
    flex-direction:column;
    align-items:center;
    align-text:center;


`;

const CreateCustomOSA = () => {
    return (
        <Wrapper>
            <p> Create your custom RSVP here</p>
            <CustomOSA />
        </Wrapper>
    )
}

const INITIAL_STATE = {
    name: "",
    error: null,
    success: false
};

class CustomOSA extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    onSubmit = event => {
        this.setState({ success: true });
        const { username, email, passwordOne } = this.state;


    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { name, error } = this.state;

        return (
            <FormStyle>
                <form onSubmit={this.onSubmit}>
                    <input
                        name="username"
                        value={name}
                        onChange={this.onChange}
                        type="text"
                        placeholder="För- och efternamn"
                    />
                    <button type="submit">
                        Add Field
                    </button>

                    {error && <p>{error.message}</p>}
                </form>
            </FormStyle>
        );
    }
}



const condition = authUser => !!authUser;

const CreateCustomizedRSVP = compose(
    withFirebase,
    withAuthorization(condition)
)(CustomOSA);

export default CreateCustomOSA;

export { CreateCustomizedRSVP }
