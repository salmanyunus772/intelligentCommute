import React from 'react';
import { Jumbotron as Jumbo, Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
//import CUILogo from './assets/COMSATS_new_logo.jpg';

const Styles = styled.div`
    .jumbotron {
        background-size : cover;
        color : blue;
        position : relative;
        z-index : -2;
    }

    .overlay {
        background-color : blue;
        opacity : 0.6;
        position : absolute;
        top : 0;
        bottom : 0;
        left : 0;
        right : 0;
        z-index : -1;
    }

`;

export const Jumbotron = () => (
    <Styles>
        <Jumbo fluid className="jumbo">
            <div className="overlay"></div>
            <Container>
                {/* <img style={{borderRadius:"150px",marginLeft:"-6%"}} width="15%" height="15%" src={CUILogo} alt="CUILogo"/>                 */}
                <center><p style={{fontSize:"55px", color:"white", marginLeft:"center", display:"inline-block"}}>Intelligent Commuting</p>
                </center>
            </Container>
        </Jumbo>
    </Styles>
);