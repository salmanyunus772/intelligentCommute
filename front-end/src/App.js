import React from "react";
import "normalize.css";
import "./Components/css/global.css";
import "./Components/css/style.css";
import { createBrowserHistory } from 'history'

import LandingPageRoute from "./LandingPageRoute";

import StudentRoutes from './Components/student/StudentRoutes'

import AdminRoutes from './Components/admin/AdminRoutes'

import DriverRoutes from './Components/driver/DriverRoutes'

import {  Router } from "react-router-dom";

const history = createBrowserHistory()
function App() {
  return (
    <Router history={history}>
      <div className="App">
        <LandingPageRoute/>
        <StudentRoutes/>
        <AdminRoutes/>
        <DriverRoutes/>
      </div>
    </Router>
  );
}

export default App;
