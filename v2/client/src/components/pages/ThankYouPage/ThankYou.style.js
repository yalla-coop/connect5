import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ThankYouWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;

export const ThankYouMsg = styled.p`
  margin: 0 auto;
  text-align: center;
  font-weight: 600;
  color: #000;
  font-size: 1.12rem;
  padding-top: 6rem;
  margin-bottom: 4rem;
`;

export const Paragraph = styled.p`
  margin: 0 auto;
  text-align: center;
  font-size: 0.95rem;
  margin-bottom: 3rem;
`;

export const StyledLink = styled(Link)`
  display: block;
  margin: 0 auto;
  text-align: center;
`;
