import styled from "styled-components";
import { Link } from "react-router-dom";

const LandingPageWrapper = styled.div`
  text-align: center
  max-width: 600px;
  margin: 0 auto;
  min-height: 100vh;
`;

const ImageWrapper = styled.div`
  box-shadow: 2px 4px 8px var(--line-color);
  margin-bottom: 70px;
  width: 100%
`;

const Image = styled.img`
  width: 75%;
  padding : 10px 0;
  max-width: 700px;
  margin: 0 auto;
  background: #fff;
`;

const TextWrapper = styled.div`
  text-align: center;
  margin-bottom: 50px
`;

const Heading = styled.h1`
  color: var(--heading-color);
  font-size: 1.7em;
`;

const Paragraph = styled.p`
  color: var( --button-text-color);
  width: 86%;
  margin: 0 auto;
  font-size: 14px;
`;

const Button = styled(Link)`
  display: block;
  line-height: 45px;
  margin: 20px auto;
  border-radius: 5px;
  text-transform: capitalize;
  font-weight: 700;
  font-size: 1em
  text-decoration: none;
  background-color: var(--button-background-color);
  color: var(--button-text-color);
  width: 80%;
  text-align: center
`;

export {
  LandingPageWrapper,
  ImageWrapper,
  Image,
  TextWrapper,
  Heading,
  Paragraph,
  Button,
};
