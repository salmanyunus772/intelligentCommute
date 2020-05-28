import React from "react";
import {BrowserRouter as Router ,Switch,Route} from 'react-router-dom';

import SignIn from './SignIn';
import Register from './Register';
import NewForm from './NewForm';
import Recover from './Recover';

import Home from './homeComponents/Home';


export default class Student extends React.Component {

  render() {
    return(
      <React.Fragment>
     
          <Route path="/student/login"  component={SignIn}/>
          <Route path="/student/register"  component={Register}/>
          <Route path="/student/recover"  component={Recover}/>
          <Route path="/student/" exact  component={Home}/>
          <Route path="/student/newform"  component={NewForm}/> 
          
          </React.Fragment>
      
    )
  }
}
