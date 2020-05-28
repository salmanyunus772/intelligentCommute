
import React from "react";
import Registerdriver from "./RegisterDriver";
import SigninDriver from "./Signindriver";
import DriverProfile from "./DriverProfile";
import NavDriver from "./NavDriver";
import DriverComplain from "./DriverComplains";
import DriverSchedule from "./DriverSchedule";
import DriverLost from "./DriverLost";
import Studentchart from './Studentchart';
import StudentPanel from '../student/StudentPanel';
import Notifications from "../student/homeComponents/Notifications"
import { Route } from "react-router-dom";

export default class DriverRoutes extends React.Component{
    render(){
        return(
            <React.Fragment>
            <Route path="/driver/registerdriver" component={Registerdriver} />          
            <Route path="/driver/login" component={SigninDriver} />
  
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
              <StudentPanel> <Studentchart/></StudentPanel>
              
            </div>
          )}
        />

        </React.Fragment>


            </React.Fragment>
        )
    }
}