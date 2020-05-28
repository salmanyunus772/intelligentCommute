import React from 'react';
//import "./css/registerComponent.css";
import { Form, Button, Group, Label ,Col } from 'react-bootstrap';


export default class NewFormComponent extends React.Component {
    render(){
    return (
        <div>
            <Form>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" name="fn" value={this.props.fn} onChange={this.props.onChangeName}/>
                    </Form.Group>
                    
                    <Form.Group as={Col} controlId="formGridLname">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text"  name="LastName" onChange={this.props.onChange} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridreg">
                        <Form.Label>Enter Registration</Form.Label>
                        <Form.Control type="text" name="Registration" onChange={this.props.onChange} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridemail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email"  name="Email" onChange={this.props.onChange} />
                    </Form.Group>


                </Form.Row>


                <Form.Group controlId="formGridAddress1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control name="Address" onChange={this.props.onChange} />
                </Form.Group>

<Form.Row>
                <Form.Group as={Col} controlId="formGridParent">
                        <Form.Label>Enter Guardian Number </Form.Label>
                        <Form.Control type="text"  name="Guardian" onChange={this.props.onChange} />
                    </Form.Group>

                
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password </Form.Label>
                        <Form.Control type="password" name="Password" onChange={this.props.onChange}/>
                    </Form.Group>
                    
                    
                <Form.Group as={Col} controlId="formGridCPassword">
                        <Form.Label>Confirm Password </Form.Label>
                        <Form.Control type="password" name="Confirmpassword" onChange={this.props.onChange} />
                    </Form.Group>
                    
                      </Form.Row>             

                <Form.Group controlId="formGridstop">
                    <Form.Label> Stops </Form.Label>
                        <select className="registerInput registerInputText registerSelect" name="stop" onChange={this.props.onChange}  >
                        <option value="1"   className="registerOption ">
                            Saddar
                        </option>
                        <option value="2" className="registerOption ">
                            Marir Chowk
                        </option>
                        <option value="3" className="registerOption ">
                            Liaquat Bagh
                        </option>
                        <option value="4" className="registerOption ">
                    Committe Chowk
              </option>
              <option value="5" className="registerOption ">
                    Waris Khan
              </option>
              <option value="6" className="registerOption ">
                    Chandni Chowk
              </option>
              <option value="7" className="registerOption ">
                    Rehmanabad
              </option>
              <option value="8" className="registerOption ">
                    6th Road
              </option>
              <option value="9" className="registerOption ">
                    Shamasbad
              </option>
              <option value="10" className="registerOption ">
                    Faizabad
              </option>
              <option value="11" className="registerOption ">
                    IJP Road
              </option>
              <option value="12" className="registerOption ">
                    Gulistan Colony
              </option>
            </select>
            </Form.Group>

                <Button variant="primary" type="submit" onChange={this.props.onClick}>
                    Submit
                 </Button>
            </Form>
        </div>
    );
    }
};




