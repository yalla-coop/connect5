import React, { Component } from 'react';
import styled from 'styled-components';
import { NavLink, Redirect } from 'react-router-dom';

const NavbarStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 64px;
  border-top: 1px solid #000;
`;

const UlStyle = styled.div`
  margin: 0 10px;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;
`;

const LiStyle = styled.i`
  margin-left: 19px;
  font-size: 36px;
  margin:0 20px;
  color: #000;
  :hover {
  color: blue;
    }
`;


class Navbar extends Component {
  render() {
    return (
      <NavbarStyle>
        <UlStyle>
          <NavLink to="/">
            <LiStyle className="fas fa-home" />
          </NavLink>
          <NavLink to="/">
            <LiStyle className="fas fa-poll-h" />
          </NavLink>
          <NavLink to="/">
            <LiStyle className="fas fa-list-alt" />
          </NavLink>
          <NavLink to="/">
            <LiStyle className="fas fa-plus-circle" />
          </NavLink>
        </UlStyle>
      </NavbarStyle>
    );
  }
}

export default Navbar;
