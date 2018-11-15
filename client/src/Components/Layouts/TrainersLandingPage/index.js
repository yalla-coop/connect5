import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Contianer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  text-align: center;
  height: 100%;
  margin-top: 70px
`;

const Heading = styled.h1`
  font-size: 1.7em;
  margin: 0 auto;
  color: var(--heading-color)
`;

const Paragraph = styled.p`
  color: gray;
  font-weight: 100;
  margin-top: 50px;
  font-size: 0.85em
  text-align: justify;
  color: var(--paragraph-color)
`;

const Button = styled(Link)`
background: none;
line-height: 35px;
margin: 15px 0;
border-radius: 5px;
text-transform: uppercase;
font-weight: 700;
font-size: 1.4em
color: black;
text-decoration: none;
background-color: var(--button-background-color);
color: var(--button-text-color);

`;

const TrainersLandingPage = () => (
  <Contianer>
    <Heading>
      Welcome
    </Heading>
    <Heading>
      Connect 5 Trainer
    </Heading>
    <Paragraph>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
      do eiusmod tempor incididunt ut labore et dolore
      magna aliquaUt co laboris nisi ut aliquip ex ea commodo consequat.
    </Paragraph>
    <Button to="/trainer/signup">Sign up</Button>
    <Button to="/trainer/login">Login</Button>
  </Contianer>
);

export default TrainersLandingPage;
