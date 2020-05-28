
import React from "react";

import { Route } from "react-router-dom";

import MainPage from "./LandingPage";

export default class LandingPage extends React.Component{
    render(){
        return(
            <React.Fragment>
                <Route path="/" exact component={MainPage} />
            </React.Fragment>
        )
    }
}