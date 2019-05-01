import React from "react";

import {
  Button, Paragraph, Heading, Container, Buttons,
} from "./PageElements";

const TrainersLandingPage = () => (
  <Container>
    <Heading>Welcome</Heading>
    <Heading>Connect 5 Trainer</Heading>
    <Paragraph>
      If you are a Connect 5 trainer please register a new account or, if you have already
      registered, log in using your existing details.
    </Paragraph>
    <Buttons>
      <Button to="/trainer/register">Sign up</Button>
      <Button to="/trainer/login">Login</Button>
    </Buttons>
  </Container>
);

export default TrainersLandingPage;
