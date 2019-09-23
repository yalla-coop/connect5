import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { colors, shadows } from '../../../theme';

export const Wrapper = styled.div`
  padding: 80px 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 750px;
  margin: 0 auto;
`;

export const TopInfo = styled.div`
  min-width: 303px;
  max-width: 600px;
  margin: 0 auto;
  font-weight: 300;
  font-size: 18px;
  line-height: 19px;
`;

export const DetailsContent = styled.div`
  background-color: ${colors.white};
  display: flex;
  max-width: 600px;
  width: 100%;
  box-shadow: ${shadows.primary};
  margin: 1rem 0;
  padding: 2rem 1rem;
  flex-direction: column;
`;

export const Detail = styled.h2`
  font-size: 1rem;
  margin-bottom: 0rem;
  font-weight: 600;
`;

export const Owner = styled.span`
  font-size: 1rem;
  padding: 0.5rem;
  margin-bottom: 0rem;
  font-weight: 400;
`;

export const Hint = styled.p`
  font-size: 1rem;
  padding: 1rem 0.5rem;
  font-weight: 300;
`;

export const StyledLink = styled(Link)`
  margin: 0 auto;
  font-weight: 300;
  font-size: 14px;
  color: ${colors.profileFontColor};
  padding: 0.5rem 0;
  cursor: pointer;

  :hover {
    color: ${colors.red};
  }
`;

export const LeaveBtn = styled.button`
  background: none;
  border: none;
  display: block;
  color: #eb5757;
  padding-top: 1rem;
  cursor: pointer;
`;
