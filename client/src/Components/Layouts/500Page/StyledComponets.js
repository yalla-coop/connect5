import styled from "styled-components";

const ServerErrorWrapper = styled.div`
  width: 100%;
  background-color: var(--heading-color);
  position: fixed;
  top: 0;
  bottom: 0;
`;
const NumbersWrapper = styled.div`
  display: flex;
  width: 50%;
  margin: 0 auto;
  min-width: 300px;
  position: absolute;
  transform: translate(-50% ,-50%);
  top: 25%;
  left: 50%;
`;
const Numbers = styled.h1`
color: #fff;
text-shadow: 6px 5px #0d1215;
font-size: 7em;
margin: 0 auto;
`;

const WallImage = styled.img`
  transform: translate(-50% ,-50%);
  position: absolute;
  top: 75%;
  left: 25%;
`;

const MsgWrapper = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50% ,-50%);
  text-align: center;
  width: 58%;
`;
const MsgTitle = styled.h1`
  color: var(--line-color);
  font-weight: 100;
`;
const MsgDescription = styled.p`
  color: #fff

`;
const Button = styled.a`
  display: block;
  line-height: 50px;
  margin: 15px 0;
  border-radius: 5px;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1.4em
  color: black;
  text-decoration: none;
  background-color: var(--large-button-background);
  color: var(--button-text-color);
  outline: none;
  border: none;
  width: 100%;
  max-width: 260px;
  margin: 0 auto;
`;

export {
  ServerErrorWrapper,
  NumbersWrapper,
  WallImage,
  MsgWrapper,
  MsgTitle,
  MsgDescription,
  Button,
  Numbers,
};
