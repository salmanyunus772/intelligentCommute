
import React from "react";
import SignIn from "./SignIn";
import Register from "./Register";
import Recover from "./Recover";
import NavbarTop from "./homeComponents/Nav";
import Track from "./homeComponents/Map.js";
import HaveComplain from "./HaveComplain";
import Lost from "./Lost";
import StudentPanel from "./StudentPanel";
import ViewLost from "./ViewLost";
import UpdateProfile from "./UpdateProfile";
import UploadImage from "./UploadImg";
import GuestStudents from "./GuestStudents";
import Guest2 from './Guest2';
import ProfileMap from "./homeComponents/ProfileMap";


import Profile from "./homeComponents/Profile";
import Notifications from "./homeComponents/Notifications";

import { Route } from "react-router-dom";
export default class StudentRoutes extends React.Component{
    render(){
        return(
            <React.Fragment>
                
        <Route path="/student/login" component={SignIn} />
        <Route path="/student/register" component={Register} />
        <Route path="/student/recover" component={Recover} />

        <Route
          path="/student/Guest"
          exact
          render={props => (
            <div>
              <StudentPanel><GuestStudents/></StudentPanel>
              
            </div>
          )}
        />
        
        <Route
          path="/student/guest2"
          exact
          render={props => (
            <div>
              <StudentPanel><Guest2/></StudentPanel>
            </div>
          )}
        />



        
        {/* Protected Routes */}
        <React.Fragment>
                <Route
          path="/student/"
          exact
          render={props => (
            <div>
              <NavbarTop />
              <Notifications />
            </div>
          )}
        />
                <Route
          path="/student/uploadimg"
          exact
          render={props => (
            <div>
              <NavbarTop />
              <UploadImage />
            </div>
          )}
        />

{/* <Route
          path="/student/googlemap"
          exact
          render={props => (
            <div>
              <NavbarTop />
              <ProfileMap />
            </div>
          )}
        /> */}
        

        
        <Route
          path="/student/track"
          render={props => (
            <div>
              <NavbarTop />
              <StudentPanel> 
              <ProfileMap />  
              </StudentPanel>
              
            </div>
          )}
        />
        <Route
          path="/student/viewlost"
          render={props => (
            <div>
              <NavbarTop />
<StudentPanel><ViewLost /></StudentPanel>
              
            </div>
          )}
        />
    
    


        <Route
          path="/student/profile"
          render={props => (
            <div>
              <NavbarTop />
              <Profile />
            </div>
          )}
        />
        <Route
          path="/student/lost"
          render={props => (
            <div>
              <NavbarTop />
              <Lost/>
            </div>
          )}
        />
        <Route
          path="/student/complain"
          render={props => (
            <div>
              <NavbarTop />
              <HaveComplain/>
            </div>
          )}
        />
        <Route
          path="/student/updateProfile"
          render={props => (
            <div>
              <NavbarTop />
              <UpdateProfile/>
            </div>
          )}
        />
        
        </React.Fragment>


            </React.Fragment>
        )
    }
}