
import React from "react";

import AdminSignIn from "./AdminSignIn";
import AdminPanel from "./AdminPanel";
import AdminNavbarTop from "./Nav";
import CreatePlan from "./CreatePlan";
import AdminNotifications from "./AdminNotifications";

import AssignRfid from "./AssignRfid";
import CreateSchedule from "./CreateSchedule";
import PostNews from "./PostNews";
import StudentStatus from "./StudentStatus";
import StudentConfirmation from "./StudentConfirmation";
import { Route } from "react-router-dom";
import ViewComplains from "./ViewComplains";
import ComplainResponse from "./ComplainResponse";
import ViewDriverComplains from "./ViewDriverComplains";
import ViewPlans from "./ViewPlans";
import AddBuses from './AddBuses';
import Mapp from "../student/homeComponents/Map";
import ViewBus from "./ViewBus";
import BusesFuel from "./BusesFuel";
import Graph from "./Graph";
import RoutesAssign from "./RoutesAssign";
export default class AdminRoutes extends React.Component{
    render(){
        return(
            <React.Fragment>
                
                <Route path="/admin/" exact render={props => ( <div> <AdminNavbarTop /> <AdminNotifications/> </div> )}/>
                {/* <Route path="/admin/" exact  render={props => ( <div> <AdminNavbarTop />  </div> )}/> */}
                <Route path="/admin/login" exact component={AdminSignIn} />
                <Route path="/admin/assignrfid" exact  render={props => ( <div> <AdminNavbarTop /> <AdminPanel><AssignRfid/></AdminPanel> </div> )}/>
                <Route path="/admin/createSchedule" exact  render={props => ( <div> <AdminNavbarTop /> <AdminPanel><CreateSchedule/></AdminPanel> </div> )}/>
                <Route path="/admin/createplan" exact  render={props => ( <div> <AdminNavbarTop /> <AdminPanel><CreatePlan/></AdminPanel> </div> )}/>
                <Route path="/admin/viewplan" exact  render={props => ( <div> <AdminNavbarTop /> <AdminPanel><ViewPlans/></AdminPanel> </div> )}/>
                <Route path="/admin/extendservice" exact  render={props => ( <div> <AdminNavbarTop /> <AdminPanel><StudentStatus/></AdminPanel> </div> )}/>
                <Route path="/admin/confirmstudents" exact  render={props => ( <div> <AdminNavbarTop /> <AdminPanel><StudentConfirmation/></AdminPanel> </div> )}/>
                <Route path="/admin/viewstudentcomplains" exact  render={props => ( <div> <AdminNavbarTop /> <AdminPanel><ViewComplains/></AdminPanel> </div> )}/>
                <Route path="/admin/drivercomplains" exact  render={props => ( <div> <AdminNavbarTop /> <AdminPanel><ViewDriverComplains/></AdminPanel> </div> )}/>
                <Route path="/admin/trackfleet" exact  render={props => ( <div> <AdminNavbarTop /> <Mapp/> </div> )}/>
                <Route path="/admin/charts" exact  render={props => ( <div> <AdminNavbarTop /> <AdminPanel><Graph/></AdminPanel> </div> )}/>
                <Route path="/admin/routeAssign" exact  render={props => ( <div> <AdminNavbarTop /> <AdminPanel><RoutesAssign/></AdminPanel> </div> )}/>
                
                <Route path="/admin/postnews" exact  render={props => ( <div> <AdminNavbarTop /> <AdminPanel><PostNews/></AdminPanel> </div> )}/>
                <Route path="/admin/busFuel" exact  render={props => ( <div> <AdminNavbarTop /> <AdminPanel><BusesFuel/></AdminPanel> </div> )}/>
                <Route path="/admin/regbus" exact  render={props => ( <div> <AdminNavbarTop /> <AdminPanel><AddBuses/></AdminPanel> </div> )}/>
                <Route path="/admin/busView" exact  render={props => ( <div> <AdminNavbarTop /> <AdminPanel><ViewBus/></AdminPanel> </div> )}/>
                <Route path="/admin/complainresponse" exact  render={props => ( <div> <AdminNavbarTop /> <AdminPanel><ComplainResponse/></AdminPanel> </div> )}/>
               

            </React.Fragment>
        )
    }
}