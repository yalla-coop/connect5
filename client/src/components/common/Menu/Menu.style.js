import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors, breakpoints } from '../../../theme';

export const MenuDiv = styled.div`
  justify-self: flex-start;
  z-index: 1000;
`;

export const Menu = styled.div`
  position: fixed;
  height: 100%;
  background: ${({ dark }) => (dark ? '#526192' : '#fff')};
  z-index: 100;
  top: ${({ dark }) => (dark ? '0' : '48px')};
  left: 0;
  width: 250px;
  transition: all 1s ease;
  padding: ${({ dark }) => (dark ? '3rem 0 0 .4rem' : '1rem 0 2rem 1rem')};
  z-index: 2000;
  overflow: auto;
  @media ${breakpoints.mobileL} {
    width: 300px;
  }
`;

export const MainDiv = styled.div`
  padding: 2rem 0 0 1rem;
`;

export const MenuItem = styled(Link)`
  margin-bottom: ${({ sub }) => (sub ? '0' : '1.5rem')};
  display: ${({ block }) => (block ? 'block' : 'flex')};
  padding: 4px;
  align-items: center;
  color: ${({ dark }) => (dark ? '#fff' : colors.lightPrimary)};
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

export const MenuClose = styled.i`
  color: '#F7F7F9';
  padding: '5px 5px 0 0';
  font-size: 30px;
  cursor: pointer;

  :hover {
    color: ${colors.primary};
  }
`;
