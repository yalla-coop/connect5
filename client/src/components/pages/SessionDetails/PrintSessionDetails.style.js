import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { colors, shadows, breakpoints } from '../../../theme';

export const Wrapper = styled.div`
  padding: 80px 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 750px;
  margin: 0 auto;
`;

export const DetailsContentS = {
  fontFamily: 'Roboto',
  backgroundColor: colors.white,
  display: 'flex',
  width: '100%',
  boxShadow: shadows.primary,
  marginBottom: '1rem',
  padding: '2rem 1rem',
  flexDirection: 'column',
};
export const DetailsContent = styled.div(DetailsContentS);

export const DetailS = {
  fontSize: '1rem',
  marginBottom: '0rem',
  fontWeight: '300',
};
export const Detail = styled.h2(DetailS);

export const BoldSpanS = { fontWeight: '500' };
export const BoldSpan = styled.span(BoldSpanS);

export const RowS = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '1rem',
};
export const Row = styled.div(RowS);

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

export const BackContainer = styled.div`
  width: 90%;
  padding: 0 20px;
  align-self: center;
  padding: 3rem 1rem 1rem;
`;

export const BackLink = styled.button`
  border: none;
  background: none;
  color: ${colors.lightPrimary};
  font-weight: 500;
  cursor: pointer;
  outline: none;

  :focus,
  :hover {
    text-decoration: underline;
  }
`;

export const TitleS = {
  fontWeight: '300',
  fontSize: '24px',
  textAlign: 'center',
  color: '#000000',
};

export const Title = styled.h1.attrs({
  style: TitleS,
})`
  @media ${breakpoints.mobileXL} {
    font-size: 32px;
  }
`;
