import styled from 'styled-components';
import { Input as AntInput } from 'antd';
import { breakpoints } from '../../../theme';

export const Wrapper = styled.div``;

export const ContentWrapper = styled.div`
  max-width: 28rem;
  margin: 0 auto;
  padding: 5rem 15px;
  margin: 0 auto;
  text-align: center;
`;

export const Input = styled(AntInput)`
  width: 90%;
  margin: 0 auto;
  height: 50px;
`;

export const Button = styled.button`
  margin: 0 auto;
  margin-top: 4rem;
  width: 170px;
  background-color: #c4c4c4;
  padding: 0.75rem;
  border-radius: 5px;
  border: none;
`;

export const Title = styled.h1`
  font-weight: 300;
  font-size: 24px;
  text-align: center;
  color: #000000;

  @media ${breakpoints.mobileXL} {
    font-size: 32px;
  }
`;

export const WhiteDiv = styled.div`
  background: white;
  padding: 2rem;
`;

export const Details = styled.p`
  font-family: Roboto;
  font-size: 16px;
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  color: #828282;
  margin-top: ${({ center }) => (center ? '3rem' : '0')};
`;

export const BoldSpan = styled.span`
  font-weight: 500;
`;
