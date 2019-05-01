import React, { Component } from "react";

import {
  LandingPageWrapper,
  ImageWrapper,
  TextWrapper,
  Heading,
  Button,
} from "./StyledComponents";
import Logo from "../../../assets/connect5_banner.jpg";

class LandingPage extends Component {
  render() {
    return (
      <React.Fragment>
        <LandingPageWrapper>
          <ImageWrapper url={Logo} />
          <TextWrapper>
            <Heading>CONNECT 5</Heading>
          </TextWrapper>
          <Button to="/trainer">I’m a Connect 5 Trainer</Button>
          <Button to="/about-us">Learn about Connect 5</Button>
        </LandingPageWrapper>
      </React.Fragment>
    );
  }
}

export default LandingPage;
