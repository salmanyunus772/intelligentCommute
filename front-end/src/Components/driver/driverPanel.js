import React, { Component } from 'react';
 
 
class DriverPanel extends Component {


  render() {
    
    return (
      <div style={{ height: '130vh',borderRadius:10, width: '100%',margin:'30px auto',padding:20,background:'white' }}>
        {this.props.children}
      </div>
    );
   
  }
}
 
export default DriverPanel;