import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors } from '../../../theme';

export const Wrapper = styled.div``;

export const ContentWrapper = styled.div`
  max-width: 28rem;
  margin: 0 auto;
  padding: 2rem 15px;
  margin: 0 auto;
  text-align: center;
`;

export const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px 0;
`;

export const HeadlineDiv = styled.div`
  margin-left: 20px;
  padding-top: 20px;
`;

export const AnotherLink = styled(Link)`
  font-size: 1rem;
  font-weight: bold;
  color: ${colors.primary};
`;

export const Logo = styled.img`
  width: 250px;
  hieght: 250px;
  margin: 0 auto;
  margin-left: 10px;
  display: inline-block;
`;

export const Button = styled.button`
  width: 250px;
  margin-top: 1.5rem;
  padding: 4px;
  align-items: center;
  background: none;
  border: 1px solid ${colors.lightPrimary};
  color: ${colors.primary};
  font-weight: bold;
  transition: all 500ms ease;
  cursor: pointer;
  i {
    margin-right: 0.5rem;
  }
  :hover {
    text-indent: 4px;
    background: ${colors.lightGray};
    color: ${colors.primary};
  }
`;
