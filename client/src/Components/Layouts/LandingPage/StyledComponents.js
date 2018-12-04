import styled from "styled-components";
import { Link } from "react-router-dom";

const LandingPageWrapper = styled.div`
  text-align: center
  max-width: 600px;
  margin: 0 auto;
  min-height: 100vh;
`;

const ImageWrapper = styled.div`
  box-shadow: 2px 4px 8px var(--light-gray-border);
  margin-bottom: 50px;
  width: 100%;
  background: #fff;
  background-image: url(${props=> props.url});
  height: 160px;
  background-size: cover;
  background-repeat: no-repeat;
  background-origin: content-box;
  background-position: center;
`;

const TextWrapper = styled.div`
  text-align: center;
  margin-bottom: 50px
`;

const Heading = styled.h1`
  color: var(--main-heading);
  font-size: 1.7em;
`;

const Paragraph = styled.p`
  color: var(--button-text-color);
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
  background-color: var(--large-button-background);
  color: var(--large-button-text);
  width: 80%;
  text-align: center
`;

export {
  LandingPageWrapper,
  ImageWrapper,
  TextWrapper,
  Heading,
  Paragraph,
  Button,
};
