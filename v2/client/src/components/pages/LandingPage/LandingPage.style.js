import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { colors, breakpointsMax, borders } from '../../../theme';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20vh;
  width: 100%;
  background: ${colors.primary};
`;

export const Logo = styled.img`
  height: 100px;
  margin: 0;
`;

export const DescriptionContainer = styled.div`
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Headline = styled.h1`
  font-size: 1.5rem;
  @media ${breakpointsMax.mobileS} {
    font-size: 1.1rem;
  }
`;

export const Paragraph = styled.p`
  font-size: 1rem;
  font-weight: 300;
  text-align: center;
  padding: 1.3rem 0 0.7rem 0;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (min-width: 678px) {
    width: 65%;
  }
`;

export const ButtonLink = styled(Link)``;

export const ButtonDiv = styled.div`
  width: 300px;
  height: 60px;
  padding: 10px;
  @media ${breakpointsMax.mobileS} {
    width: 257px;
    height: 66px;
  }
  button {
    font-size: 1rem;
    font-weight: 350;
    opacity: 0.8;
    color: ${colors.black};
    background-color: ${colors.white};
  }
  button: hover {
    opacity: 1;
    font-weight: 400;
    color: ${colors.white};
    background-color: ${colors.primary};
  }
`;

// Style for about us page

export const AboutUsWrapper = styled.div`
  display; flex;
  flex-direction: column;
  padding: 2rem .3rem;
  @media (min-width: 768px) {
    width: 60%;
    margin: 0 auto
  }
`;

export const Summury = styled.div``;

export const Heading = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.2;
  margin-bottom: 22px;
  text-align: center;
  position: relative;
  color: ${colors.primary};
  @media (min-width: 768px) {
    font-size: 2rem;
    font-weight: 500;
  }

  &::after {
    content: ' ';
    position: absolute;
    border-bottom: ${borders.heading};
    bottom: -6px;
    left: 72px;
    width: 45%;
    @media (min-width: 768px) {
      width: 25%;
      left: 37%;
    }
  }
`;

export const H3 = styled.h3`
  font-size: 1rem;
  font-weight: 400;
  text-align: center;
  padding: 1.5rem 0;
`;

export const H4 = styled.h4`
  font-weight: 300;
  text-align: center;
  padding-top: 0.9rem;
`;

export const P = styled.p`
  line-height: 1.4;
  text-align: center;
  margin: 0px 10px;
  color: ${colors.blackSecondary};
`;

export const Mission = styled.div``;

export const About = styled.div`
  display: flex;
  flex-direction: column;
  background: ${colors.transLightGray};
  margin-top: 1.5rem;
  @media (min-width: 768px) {
    margin-top: 2rem;
  }
`;

export const Question = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
  margin-bottom: 20px;
  color: #6a6a6a;
  padding: 0 5px;
  overflow: hidden;
`;

export const Ul = styled.li`
  padding-left: 10px;
  margin: 20px 0;
  list-style: none;
`;

export const Li = styled.li`
  margin-bottom: 25px;
  display: list-item;
  font-size: 1rem;
  font-weight: 300;
  text-align: left;
`;

export const Blockquote = styled.div`
  display: block;
  grid-area: blockquote;
  background-color: ${colors.backgroundWashOut};
  color: ${colors.red};
  border: none;
  position: relative;
  margin: 0 0 20px;
  padding: 20px;
`;

export const Block = styled.blockquote`
  margin-top: 30px;
  width: 100%;
  &:before {
    content: '\2706';
    font-size: 30px;
  }
  &:after {
    content: '\2192';
  }
`;

export const Quote = styled.p`
  margin-bottom: 20px;
  margin: 40 0 20px;
  line-height: 1.4;
  font-weight: 400;
  font-size: 1rem;
`;

export const Speaker = styled.p`
  color: #3e3327;
  font-size: 16px;
  margin: 0 0 30px;
  line-height: 1.4;
`;
