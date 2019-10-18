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

export const DetailsContent = styled.div`
  background-color: ${colors.white};
  display: flex;
  width: 100%;
  box-shadow: ${shadows.primary};
  margin-bottom: 1rem;
  padding: 2rem 1rem;
  flex-direction: column;
`;

export const Detail = styled.h2`
  font-size: 1rem;
  margin-bottom: 0rem;
  font-weight: 300;
`;

export const BoldSpan = styled.span`
  font-weight: 500;
  cursor: ${pointer => pointer && 'pointer'};
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const DeteteAccountBtn = styled.div`
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
