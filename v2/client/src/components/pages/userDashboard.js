import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors } from '../../theme';

const DashboardWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const H3 = styled.h3`
  text-align: center;
  margin: 0 auto;
  padding-top: 3.5rem;
`;

const Content = styled.p`
  text-align: center;
  margin-top: 3rem;
`;

const Span = styled.span`
  text-align: center;
  display: block;
`;

const Pin = styled.span`
  text-align: center;
  font-weight: 600;
  font-size: 1.5rem;
  display: block;
  margin-top: 1.5rem;
  margin-bottom: 3rem;
`;

const LinkBtn = styled(Link)`
  background-color: ${colors.lightPrimary};
  border-radius: 28px;
  border: 1px solid ${colors.lightPrimary};
  width: 200px;
  display: block;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 2rem;
  cursor: pointer;
  color: ${colors.white};
  font-size: 1.2rem;
  padding: 14px 30px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #2f6627;

  &:hover {
    background-color: ${colors.white};
    color: ${colors.lightPrimary};
    border: 1px solid ${colors.lightPrimary};
  }

  &:active {
    position: relative;
    top: 1px;
  }
`;

const UserDashboard = ({ PIN }) => {
  return (
    <DashboardWrapper>
      <H3>Welcome back</H3>
      <Content>
        <Span>my pin:</Span>
        <Pin>{PIN}</Pin>
      </Content>
      <LinkBtn to="/participant/behavioral-insight">Insights</LinkBtn>
      <LinkBtn to="/participant/progress" disabled>
        Progress
      </LinkBtn>
    </DashboardWrapper>
  );
};

const mapStateToProps = state => ({
  PIN: state.auth.pin,
});

export default connect(mapStateToProps)(UserDashboard);
