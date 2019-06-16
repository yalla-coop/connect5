import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors, shadows } from '../../../theme';

export const LoginWrapper = styled.div`
  margin: 0 auto;
  width: 90%;
  padding: 2.5rem 0 1.8rem 0;
  border-radius: 12px;
  box-shadow: ${shadows.form};
  @media (min-width: 768px) {
    padding: 4rem 0;
    width: 30%;
  }
`;

export const LoginHeading = styled.div`
  margin: 0 auto;
  width: 80%;
  padding-top: 6rem;
  padding-bottom: 1rem;
  text-align: center;
`;

export const H3 = styled.h3`
  text-align: center;
  font-weight: 400;
  line-height: 29px;
  text-align: center;
  color: ${colors.profileFontColor};
`;

export const LoginForm = styled.form``;

export const InputDiv = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-bottom: 2rem;
  @media (min-width: 768px) {
    background: ${colors.ligthGray};
  }
`;

export const LoginFail = styled.div`
  width: 80%;
  color: red;
  margin-left: 3rem;
  font-size: 1rem;

  @media (min-width: 768px) {
    width: 80%;
    margin-left: 1rem;
  }
`;

export const NoAccount = styled(InputDiv)`
  color: ${colors.black};
  margin-bottom: 0;
  &:not(:last-child) {
    margin-top: 6rem;
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
  height: 4.3rem;
`;
