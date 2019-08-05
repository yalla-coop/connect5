import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors } from '../../../theme';

export const MenuDiv = styled.div`
  justify-self: flex-end;
  z-index: 1000;
`;
export const Menu = styled.div`
  position: absolute;
  background: ${colors.white};
  z-index: 100;
  top: 0;
  right: 0;
  width: 250px;
  height: 100vh;
  transition: all 1s ease;
  padding: 40px 10px;
  z-index: 1000;
`;

export const MainDiv = styled.div`
  padding: 2.5rem 0 0 2rem;
`;

export const MenuItem = styled(Link)`
  margin-bottom: 2.5rem;
  display: flex;
  padding: 10px 4px;
  align-items: center;
  color: ${colors.lightPrimary};
  font-weight: bold;
  transition: all 500ms ease;
  cursor: pointer;
  i {
    margin-right: 0.5rem;
  }
  :hover {
    text-indent: 10px;
    font-size: 1.1rem;
    background: ${colors.lightGray};
    color: ${colors.primary};
  }
`;

export const MenuIcon = styled.i`
  color: ${colors.lightPrimary};
  font-size: 25px;
  cursor: pointer;
  :hover {
    color: ${colors.primary};
  }
`;
export const MenuClose = styled.i`
  position: absolute;
  font-size: 23px;
  top: 0;
  right: 15px;
  margin: 20px 0px 10px 10px;
  cursor: pointer;
  color: ${colors.gray};
  cursor: pointer;
  :hover {
    color: ${colors.primary};
  }
`;
