import React, { Component } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0 20px 0 0;
  width: 100%;
  height: 72px;
  border-top: 1px solid #42c4de;
  position: fixed;
  bottom: 0;
  background-color: #fff;
  z-index: 1000;
`;

const parent = styled.div`
  position: absolute;
  text-align: center;
  display: block;
  border-radius: 50%;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
`;

const Navlink = styled(NavLink)`
  display: block;
  text-decoration: none;
  padding: 0 12px;
`;

const Container = styled.div`
  width: 50px;
  height: 50px;
  text-align: center;
  margin: 0 auto;
  border-radius: 50%;
`;

const Icon = styled.i`
  width: 100%;
  height: 100%;
  line-height: 50px;
  font-size: 35px;
  color: #42c4de;
  &:hover {
    color: #0288d1;
  }
`;

const Span = styled.span`
  display: block;
  position: relative;
  font-size: 17px;
  margin-left: 3px;
  color: #42c4de;
`;

const Span4 = styled.span`
  display: block;
  position: relative;
  font-size: 17px;
  margin-left: 10px;
  color: #42c4de;
`;

class Navbar extends Component {
  render() {
    return (
      <Wrapper>
        <parent>
          <Navlink to="/trainer/dashboard">
            <Container>
              <Icon className="fas fa-home" />
            </Container>
            <div>
              <Span>Home</Span>
            </div>
          </Navlink>
        </parent>

        <parent>
          <Navlink to="/overview-results">
            <Container>
              <Icon className="fas fa-poll-h" />
            </Container>
            <div>
              <Span>Results</Span>
            </div>
          </Navlink>
        </parent>

        <parent>
          <Navlink to="/view-sessions">
            <Container>
              <Icon className="fas fa-list-alt" />
            </Container>
            <div>
              <Span>Sessions</Span>
            </div>
          </Navlink>
        </parent>

        <parent>
          <Navlink to="/create-session">
            <Container>
              <Icon className="fas fa-plus-circle" />
            </Container>
            <div>
              <Span4>Add</Span4>
            </div>
          </Navlink>
        </parent>
      </Wrapper>
    );
  }
}

export default Navbar;
