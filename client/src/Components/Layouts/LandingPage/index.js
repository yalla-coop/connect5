import React, { Component } from "react";

import {
  LandingPageWrapper,
  ImageWrapper,
  Image,
  TextWrapper,
  Heading,
  Paragraph,
  Button,
} from "./StyledComponents";
import Logo from "./logo.jpg";

class LandingPage extends Component {
  render() {
    return (
      <React.Fragment>
        <LandingPageWrapper>
          <ImageWrapper>
            <Image src={Logo} />
          </ImageWrapper>
          <TextWrapper>
            <Heading>CONNECT 5</Heading>
            <Paragraph>
              Connect 5 has been developed to give frontline staff the confidence to have more
              effective conversations with the public about their mental health and wellbeing
            </Paragraph>
          </TextWrapper>
          <Button to="/trainer">I’m a Connect 5 Trainer</Button>
          <Button to="/about-us">Learn about Connect 5</Button>
        </LandingPageWrapper>
      </React.Fragment>
    );
  }
}

export default LandingPage;
