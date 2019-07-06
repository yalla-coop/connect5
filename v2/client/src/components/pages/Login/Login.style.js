import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors, shadows } from '../../../theme';

export const LoginContainer = styled.div`
  padding-top: 8rem;
  max-width: 25rem;
  width: 100%;
  margin: 0 auto;
`;

export const LoginWrapper = styled.div`
  margin: 0 auto;
  max-width: 25rem;
  width: 90%;
  padding: 0 0 1.8rem 0;
  background: #ebebeb;
  box-shadow: ${shadows.form};
  opacity: 0;
  animation: card-animation 1s 1s ease forwards;
  @keyframes card-animation {
    100% {
      opacity: 1;
    }
  }
`;

export const LoginPinWrapper = styled(LoginWrapper)`
  border-radius: 12px;
  padding: 2.5rem 0;
  box-shadow: ${shadows.form};
`;

export const LoginHeading = styled.div`
  opacity: 0;
  animation: header-animation 1s 2s ease forwards;
  background: ${colors.primary};
  max-width: 25rem;
  width: 100;
  margin-bottom: 3rem;
  box-shadow: ${shadows.form};
  @keyframes header-animation {
    100% {
      opacity: 1;
    }
  }
`;

export const H3 = styled.h3`
  display: block;
  font-size: 1.4em;
  color: ${colors.white};
  text-align: center;
  line-height: 29px;
  padding: 1rem 0;
`;

export const LoginForm = styled.form``;

export const InputDiv = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-bottom: 2rem;
  opacity: 0;
  animation: input-animation 1s 3s ease forwards;
  @keyframes input-animation {
    100% {
      opacity: 1;
    }
  }
  @media (min-width: 768px) {
    background: ${colors.ligthGray};
    width: 85%;
  }
`;

export const LoginFail = styled.div`
  width: 90%;
  color: red;
  margin: auto;
  font-size: 1rem;
`;

export const NoAccount = styled(InputDiv)`
  color: ${colors.black};
  margin-bottom: 0;
  &:not(:last-child) {
    margin-top: 6rem;
  }
  opacity: 0;
  animation: input-animation 1s 4s ease forwards;
  @keyframes input-animation {
    100% {
      opacity: 1;
    }
  }

  @media (min-width: 768px) {
    width: 80%;
    text-align: center;
  }
`;

export const AnotherLink = styled(Link)`
  font-size: 1rem;
  font-weight: 500;
  color: #2c3192;
`;

export const Paragraph = styled.p`
  margin-left: 1.5rem;
  @media (min-width: 768px) {
    margin-left: 0.2rem;
  }
`;

export const Content = styled.p`
  margin: 0 auto;
  width: 80%;
  padding-bottom: 2rem;
  text-align: center;
  @media (min-width: 768px) {
    text-align: center;
    margin: 0 auto;
  }
`;

export const Space = styled.div`
  height: 5.5rem;
  @media (min-width: 768px) {
    height: 5.5rem;
  }
`;
