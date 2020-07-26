import React, { Component } from 'react';
import {Container } from 'react-bootstrap';
 
 
class StudentPanel extends Component {


  render() {
    
    return (
    
      <div style={{ height: '90vh',borderRadius:10, width: '100%',margin:'30px auto',padding:20,background:'white' }}>
        {this.props.children}
       
      </div>
    );
   
  }
}
 
export default StudentPanel;