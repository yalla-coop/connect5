import React from 'react';
import styled, { css } from 'styled-components';

import { colors, borders, shadows } from '../../../theme';

const sharedStyles = css`
  position: relative;
  text-align: center;
  text-decoration: none;
  outline: none;
  text-transform: uppercase;
  border: 0;
  color: ${colors.profileFontColor};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${props => props.disabled && !props.loading && 0.3};
  font-weight: 500;
  font-size: 1.125rem;
  box-shadow: ${shadows.primary};
  margin: ${props => props.margin};

  &:hover::after {
    content: '';
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background: rgba(255, 255, 255, 0.08);
    box-shadow: none;
  }

  &:active::after {
    content: '';
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background: ${colors.transGray};
    box-shadow: none;
  }
`;

export const squareStyles = css`
  height: ${props => props.height || '2rem'};
  width: ${props => props.width || '100px'};
`;

export const roundStyles = css`
  height: ${props => props.height || '2.5rem'};
  width: ${props => props.width || '100px'};
  border-radius: 6px;

  &::after {
    border-radius: 6px;
  }
`;

export const primaryStyles = css`
  background-color: ${colors.primary};
  color: ${colors.white};
`;

export const darkStyles = css`
  background-color: ${colors.black};
  color: ${colors.white};
`;

export const lightStyles = css`
  background-color: ${colors.white};
  color: ${colors.profileFontColor};
`;

export const outlineStyles = css`
  background-color: ${colors.white};
  color: ${colors.profileFontColor};
  border-radius: 6px;
  border: ${borders.button};

  &::after {
    border-radius: 6px;
  }
`;

const StyledButton = styled.button`
  ${sharedStyles};
  ${props => props.type === 'primary' && roundStyles}
  ${props => props.type === 'primary' && primaryStyles}
  ${props => props.type === 'dark' && roundStyles}
  ${props => props.type === 'dark' && darkStyles}
  ${props => props.type === 'light' && squareStyles}
  ${props => props.type === 'light' && lightStyles}
  ${props => props.type === 'outline' && roundStyles}
  ${props => props.type === 'outline' && outlineStyles}
`;

const Button = ({ label, ...props }) => {
  return (
    <StyledButton aria-label={label} {...props}>
      {label}
    </StyledButton>
  );
};

export default Button;
