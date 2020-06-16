
import React from "react";
import Registerdriver from "./RegisterDriver";
import SigninDriver from "./Signindriver";
import DriverProfile from "./DriverProfile";
import NavDriver from "./NavDriver";
import DriverComplain from "./DriverComplains";
import DriverSchedule from "./DriverSchedule";
import DriverLost from "./DriverLost";
import Studentchart from './Studentchart';
import DriverPanel from './driverPanel';

import Notifications from "../student/homeComponents/Notifications"
import { Route } from "react-router-dom";
import driverRecover from "../driver/driverRecover";
import DriverViewlost from "../driver/driverViewlost";
export default class DriverRoutes extends React.Component{
    render(){
        return(
            <React.Fragment>
            <Route path="/driver/registerdriver" component={Registerdriver} />          
            <Route path="/driver/login" component={SigninDriver} />
            <Route path="/driver/recover" component={driverRecover} />
  
             <React.Fragment>
              <Route
                path="/driver/"
                exact
                render={props => (
                <div>
              <NavDriver />
              <Notifications />
            </div>
          )}
        />
        <Route
          path="/driver/profile"
          render={props => (
            <div>
              <NavDriver />
              <DriverProfile/>
            </div>
          )}
        />
      <Route
          path="/driver/myschedule"
          render={props => (
            <div>
              <NavDriver />
              <DriverSchedule/>
            </div>
          )}
        />
        <Route
          path="/driver/driverviewlost"
          render={props => (
            <div>
              <NavDriver />
              <DriverPanel>
              <DriverViewlost/></DriverPanel>
              
            </div>
          )}
        />
      
        <Route
          path="/driver/lost"
          render={props => (
            <div>
              <NavDriver />
              <DriverLost/>
            </div>
          )}
        />
        <Route
          path="/driver/complain"
          render={props => (
            <div>
              <NavDriver />
              <DriverComplain/>
            </div>
          )}
        />
<Route
          path="/driver/studentchart"
          render={props => (
            <div>
              <NavDriver />
              <DriverPanel> <Studentchart/></DriverPanel>
              
            </div>
          )}
        />

        </React.Fragment>


            </React.Fragment>
        )
    }
}