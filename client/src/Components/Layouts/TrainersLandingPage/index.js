import React from 'react';
import styled from 'styled-components';


const Contianer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  text-align: center;
  height: 100%;
`;

const Heading = styled.h1`
  font-size: 1.7em;
`;

const Paragraph = styled.p`
  color: gray
`;

const Button = styled.button`
background: none;
border: 1px solid black;
line-height: 35px;
margin: 15px 0;
border-radius: 5px;
text-transform: uppercase;
font-weight: 700
`;

const TrainersLandingPage = () => (
  <Contianer>
    <Heading>
      Welcome Connect 5 Trainer
    </Heading>
    <Paragraph>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
      do eiusmod tempor incididunt ut labore et dolore
      magna aliquaUt co laboris nisi ut aliquip ex ea commodo consequat.
    </Paragraph>
    <Button>Sign up</Button>
    <Button>Login</Button>
  </Contianer>
);

export default TrainersLandingPage;
