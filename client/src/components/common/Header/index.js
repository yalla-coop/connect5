import React from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

import { colors, borders, shadows } from '../../../theme';

import Connect5Logo from '../../../assets/connect-5-white.png';

import { HOME_URL } from '../../../constants/navigationRoutes';
import { checkBrowserWidth } from '../../../actions/checkBrowserWidth';
import HumburgerMenu from '../Menu';

const sharedStyles = css`
  position: fixed;
  left: 0;
  width: 100%;
  box-shadow: ${shadows.primary};
  color: ${colors.white};
  padding: 0.5rem;
  z-index: 1000;
`;

export const sectionHeader = css`
  display: flex;
  justify-content: flex-start;
  top: ${props => (props.nudge ? '31px' : 0)};
  background-color: ${colors.primary};
  color: ${colors.offWhite};
  height: 48px;
  text-align: left;
  text-transform: capitalize;
  h1 {
    font-size: 1.3rem;
    font-weight: 400;
    position: relative;
    color: ${colors.offWhite};
    &::after {
      content: ' ';
      position: absolute;
      border-bottom: ${borders.header};
      bottom: -12px;
      left: 0;
      width: 100%;
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
    color: ${colors.offWhite};
  }
`;

export const homeHeader = css`
  top: 0;
  background-color: ${colors.primary};
  color: ${colors.offWhite};
  height: 48px;
  display: flex;
  justify-content: space-between;
`;

const StyledHeader = styled.div`
  ${sharedStyles};
  ${props => props.type === 'section' && sectionHeader};
  ${props => props.type === 'view' && viewHeader};
  ${props => props.type === 'home' && homeHeader};
`;

const HomeIcon = styled(NavLink)`
  text-decoration: none;
  color: ${colors.offWhite};
  i {
    font-size: 30px;
  }
`;

const Logo = styled.img`
  height: 32px;
  margin: 0;
`;

// NOTE: If you need Section and View header at same time
// then give your section header the nudge prop to shift it down

const Header = ({
  label,
  type,
  userRole,
  isDeskTop,
  isMobile,
  isAuthenticated,
  ...props
}) => {
  return (
    <>
      {type === 'home' ? (
        <StyledHeader type={type} {...props}>
          {isAuthenticated ? (
            <HumburgerMenu />
          ) : (
            <Logo src={Connect5Logo} alt="logo" />
          )}
          <HomeIcon to={userRole ? '/participant-dashboard' : HOME_URL}>
            <i className="fas fa-home" />
          </HomeIcon>
        </StyledHeader>
      ) : (
        <StyledHeader type={type} {...props}>
          {isAuthenticated && type === 'section' && <HumburgerMenu />}
          <h1>{label}</h1>
        </StyledHeader>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  width: state.checkBrowserWidth.width,
  isMobile: state.checkBrowserWidth.isMobile,
  isDeskTop: state.checkBrowserWidth.isDeskTop,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
  mapStateToProps,
  { checkBrowserWidth }
)(Header);
