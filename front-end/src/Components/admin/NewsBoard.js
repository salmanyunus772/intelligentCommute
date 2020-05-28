import React from "react";
import "../css/register.css";
import {Table}  from "react-bootstrap";
import axios from "axios";

import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import styled from 'styled-components';

const Styles = styled.div`
    p {
        color : green;
        font-weight : bold;
        margin-left:2%; 
        font-size: 20px;
        text-align: center;
    }    
    
`;

export default class ViewNews extends React.Component{


  constructor(){
        super();
        this.state={ 
            newsArray:[] };
    }
             
    componentDidMount(){
        axios
        .get("/api/admin/getNews")
        .then(response => {
            this.setState({ newsArray:response.data.news})

        })
        .catch(err => {
          console.log(err);
        
        });
    }
    createTable = () => {
      let paragraphs = [];

      if (this.state.newsArray.length == []) {
        
        paragraphs.push(
          <p> No notifications uptill now!</p>
          );
          return paragraphs;
        } 
        else {

          this.state.newsArray.forEach((element, key) => {
          paragraphs.push(
            <Styles>
          <p key={key}> {key+1}. {element.date} {element.news}</p>
            </Styles>
          );
          });
          return paragraphs;
        }
      };
     
    render(){
        return(
            <div>
              <Styles>
              <div id="noticeBoard" style={{marginLeft:"27%", borderRadius:"2%", borderStyle:"solid", borderWidth:"thick", borderColor:"black", width:"50%", backgroundColor:"lightgrey"}}>
            <u style={{color:"red"}}><b><center><p style={{fontSize:"35px", color:"red"}}>NOTICEBOARD</p></center></b></u>
              {this.createTable()}
          </div>
          </Styles>

              {/* <div style={{marginLeft:"27%", borderRadius:"2%", borderStyle:"solid", borderWidth:"thick", borderColor:"black", width:"50%", backgroundColor:"lightgrey"}}> */}
                {/* {this.createTable()} */}
              {/* </div> */}

          </div>
        );
    }
}