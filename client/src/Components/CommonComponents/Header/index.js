import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logout from "../Logout/index";
import Logo from "../../../assets/connect5_logo_main.jpg";

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 55px;
  box-sizing: border-box;
  padding: 0 20px;
  background-color: #fff;
  z-index: 10000;

  + * {
    margin-top: 55px;
  }

  :after {
    content: "";
    display: block;
    width: 100%;
    background-color: var(--line-color);
    position: absolute;
    top: 55px;
    height: 3px;
    left: 0;
  }
`;


const I = styled.i`
  font-size: 35px;
  color: #42C4DE;
  margin-right: 6px;
`;

const Icons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 75px;
  height: 100%
`;

const Image = styled.img`
  height: 50px;
`;


class Header extends Component {
  state= {
    login: false,
  }

  componentDidMount() {
    if (localStorage.jwtToken) {
      this.setState({ login: true });
    }
  }

  logout = () => {
    localStorage.removeItem("jwtToken");
    this.setState({ login: false });
    window.location.href = "/";
  }

  render() {
    const { logout } = this;
    const { login } = this.state;
    return (
      <Container>
        <Image src={Logo} alt="Logo" />
        <Icons>
          <Link to="/">
            <I className="fas fa-home" />
          </Link>
          {login ? <Logout logout={logout} /> : null}
        </Icons>
      </Container>

    );
  }
}

export default Header;
