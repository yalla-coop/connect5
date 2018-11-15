import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Logo from './Logo.jpg';

const Contianer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left:0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 55px;
  box-sizing:border-box;
  padding: 0 20px;

    + * {
      margin-top:55px
    }

    :after{
      content: "";
      display: block;
      width:100%;
      background-color: var( --line-color);
      position: absolute;
      top: 55px;
      height: 3px;
      left: 0;
    }
`;

const I = styled.i`
  font-size: 35px;
  color: var(--paragraph-color)
`;

const Image = styled.img`
  height: 50px;
`;

const Header = () => (
  <Contianer>
    <Link to="/">
      <I className="fas fa-home" />
    </Link>
    <Image src={Logo} alt="Logo" />
  </Contianer>
);

export default Header;
