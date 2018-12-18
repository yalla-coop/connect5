import styled, { keyframes } from "styled-components";

const PageNotFoundWrapper = styled.div`
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
const Image = styled.img`
  width: 30%;
  object-fit: contain;
  height: 100%;
`;

const ZeroWrapper = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
  position: relative;
  animation: zero 4s infinite ease-in-out;
`;

const zeroTransform = keyframes`
  0% {
    transform: rotate(-3deg);
  }

  50% {
    transform: rotate(3deg);
  }
  100% {
    transform: rotate(-3deg);
  }
`;

const ZeroImage = styled.img`
  width: 100%;
  position: absolute;
  transform-origin: top;
  animation: ${zeroTransform} 2s linear infinite;
`;
const NailImg = styled.img`
  width: 18%;
  z-index: 2;
  position: absolute;
  position: absolute;
  top: 0;
  left: 50%;
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
  color: var(--text-color);
  outline: none;
  border: none;
  width: 100%;
  max-width: 260px;
  margin: 0 auto;
`;

export {
  PageNotFoundWrapper,
  NumbersWrapper,
  Image,
  ZeroWrapper,
  ZeroImage,
  NailImg,
  WallImage,
  MsgWrapper,
  MsgTitle,
  MsgDescription,
  Button,
};
