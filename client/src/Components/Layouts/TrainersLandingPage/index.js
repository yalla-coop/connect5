import React from "react";

import {
  Button, Paragraph, Heading, Container,
} from "./PageElements";

const TrainersLandingPage = () => (
  <Container>
    <Heading>Welcome</Heading>
    <Heading>Connect 5 Trainer</Heading>
    <Paragraph>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliquaUt co laboris nisi ut aliquip ex ea commodo consequat.
    </Paragraph>
    <Button to="/trainer/register">Sign up</Button>
    <Button to="/trainer/login">Login</Button>
  </Container>
);

export default TrainersLandingPage;
