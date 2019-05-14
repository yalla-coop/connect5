import React from 'react';
import styled, { css } from 'styled-components';

import { colors, borders, shadows } from '../../../theme';

const sharedStyles = css`
  position: fixed;
  width: 100%;
  box-shadow: ${shadows.primary};
  color: ${colors.white};
  padding: 0.5rem;
`;

export const sectionHeader = css`
  top: ${props => props.nudge ? "31px" : 0};
  background-color: ${colors.primary};
  color: ${colors.offWhite};
  height: 48px;
  text-align: left;
  text-transform: capitalize;

  h1 {
    font-size: 1.5rem;
    font-weight: 400;
    position: relative;

    &::after {
      content: ' ';
      position: absolute;
      border-bottom: ${borders.header};
      bottom: -2px;
      left: 0;
      width: 50%;
    }
  }
`;

export const viewHeader = css`
  top: 0;
  background-color: ${colors.black};
  color: ${colors.offWhite};
  height: 32px;
  text-align: center;
  text-transform: capitalize;

  h1 {
    font-size: 1rem;
    font-weight: 300;
  }
`

const StyledHeader = styled.div`
  ${sharedStyles}
  ${props => props.type === 'section' && sectionHeader}
  ${props => props.type === 'view' && viewHeader}
`;

// NOTE: If you need Section and View header at same time 
// then give your section header the nudge prop to shift it down

const Header = ({ label, ...props }) => {
  return (
    <StyledHeader {...props}>
      <h1>{label}</h1>
    </StyledHeader>
  );
};

export default Header;
