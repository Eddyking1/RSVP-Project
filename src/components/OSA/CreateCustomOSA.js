import React, { Component } from "react";
import { compose } from "recompose";
import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import { FormStyle, Success, Button } from "../../styles/GlobalStyle";
import * as ROUTES from "../../constants/routes";


export const CreateCustomOSA = () => {
    return (
        <div>
            
        </div>
    )
}

const condition = authUser => !!authUser;

export default compose(
    withFirebase,
    withAuthorization(condition)
)(CreateCustomOSA);
