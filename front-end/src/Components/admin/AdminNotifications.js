import React from "react";
import {
  Container,
  Accordion,
  Card,
  Pagination
} from "react-bootstrap";
import axios from "axios";

export default class AdminNotifications extends React.Component {
  constructor() {
    super();
    this.state = {
      AllNotifications: [],
      currentPage: 1,
      totalPages: 0,
      currentNotifications: {},
      notificationsPerPage: 7,
         };
    this.handleClick = this.handleClick.bind(this);
    this.genPages = this.genPages.bind(this);
    this.getNotifications = this.getNotifications.bind(this);
  }
  handleClick(e) {
    if(e.target.text){
     this.setState({currentPage:Number(e.target.text)});
    }
    
  }

  genPages() {
    let pages = [];
     ;
    for (let i = 0; i < this.state.totalPages; i++) {
      pages.push(
        <Pagination.Item
          onClick={this.handleClick}
          key={i + 1}
          active={i+1 === this.state.currentPage}
        >
          {i + 1}
        </Pagination.Item>
      );
    }

    return pages;
  }
  getNotifications() {
    let notifications = [];
    
    if(this.state.totalPages !== 0){
    try {
      
      for (
        let i = (this.state.currentPage - 1) * this.state.notificationsPerPage;
        i < this.state.currentPage * this.state.notificationsPerPage;
        i++
      ) {
        notifications.push(
          <Card key={i}>
            <Accordion.Toggle as={Card.Header} eventKey={i}>
              {this.state.AllNotifications[i].title}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={i}>
              <Card.Body>{this.state.AllNotifications[i].details}</Card.Body>
            </Accordion.Collapse>
          </Card>
        );
        
      }
    } catch (e) {}
  }
    return notifications;
  }

  UNSAFE_componentWillMount() {
    var config = {
      headers: { Authorization: "bearer " + localStorage.getItem("token") }
    };

    var bodyParameters = {};
    axios
      .post(
        "http://localhost:3000/api/student/getNotifications",
        bodyParameters,
        config
      )
      .then(response => {
        this.setState({
          AllNotifications: response.data.notifications,
          totalPages: Math.ceil(response.data.notifications.length / 7)
        });
      })
      .catch(error => {
        this.setState({loggedIn:false})
      });
  }

  render() {
 
    return (
      <div
        style={{
          position: "relative",
          textAlign: "center",
          paddingTop: 40,
          margin: "0 auto",
          width: "80%",
          minHeight: "700px"
        }} >
        <h1>Notifications</h1>
        <hr />
        <Container
          style={{
            background: "white",
            paddingBottom: 2,
            paddingTop: 15,
            borderRadius: 10
            // minHeight: 500
          }}
        >
          <Accordion defaultActiveKey="0">
            {this.getNotifications()}
          </Accordion>
          <Pagination style={{ margin: 10 }}>{this.genPages()}</Pagination>
        </Container>
      </div>
    );
 
  }
}
