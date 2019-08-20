import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors, breakpoints } from '../../../theme';

export const MenuDiv = styled.div`
  justify-self: flex-start;
  z-index: 1000;
`;

export const Menu = styled.div`
  position: absolute;
  background: ${({ dark }) => (dark ? '#526192' : '#fff')};
  z-index: 100;
  top: ${({ dark }) => (dark ? '0' : '48px')};
  left: 0;
  width: 250px;
  height: 100vh;
  transition: all 1s ease;
  padding: ${({ dark }) => (dark ? '3rem 0 0 .4rem' : '2rem 0 0 1rem')};
  z-index: 2000;
  @media ${breakpoints.mobileL} {
    width: 300px;
  }
`;

export const MainDiv = styled.div`
  padding: 2rem 0 0 1rem;
`;

export const MenuItem = styled(Link)`
  margin-bottom: 1.5rem;
  display: flex;
  padding: 4px;
  align-items: center;
  color: ${({ dark }) => {
    return dark ? '#fff' : colors.lightPrimary;
  }};
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

export const LogOut = styled.button`
  margin-bottom: 1.5rem;
  width: 250px;
  display: flex;
  padding: 4px;
  align-items: center;
  background: none;
  border: none;
  color: ${colors.lightPrimary};
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

export const OpenIconDiv = styled.div`
  cursor: pointer;
  border-radius: 50%;
  display: inline-block;
  padding: 4px 8px 3px 0px;
  margin-top: -7px;
  margin-right: 10px;
  @media ${breakpoints.mobileL} {
    margin-right: 20px;
  }
`;

export const MenuIcon = styled.i`
  color: '#F7F7F9';
  padding: 10px;
  font-size: 25px;
  cursor: pointer;
  :hover {
    color: ${colors.lightPrimary};
    outline: none;
  }
`;
