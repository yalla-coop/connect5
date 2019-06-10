import React, { Component } from 'react';
import { connect } from 'react-redux';

// COMMON COMPONENTS
import Header from '../../common/Header';
import Button from '../../common/Button';

// STYLING
import {
  Wrapper,
  TopSection,
  Title,
  ContentWrapper,
  Question,
  StyledLink,
} from './DecideView.style';

// ROUTES
import { DASHBOARD_URL } from '../../../constants/navigationRoutes';

class DecideView extends Component {
  render() {
    const { userName, role } = this.props;
    // const { id } = auth;

    const capitalizesName =
      userName && userName[0].toUpperCase() + userName.substr(1);

    return (
      <Wrapper>
        <Header type="home" />
        <TopSection>
          <Title>
            Welcome back, <br /> {capitalizesName}
          </Title>
        </TopSection>
        <ContentWrapper>
          <Question>What would you like to do today?</Question>
          {role === 'admin' && (
            <StyledLink to={DASHBOARD_URL}>
              <Button
                label="view as admin"
                type="light"
                width="250px"
                height="48px"
              />
            </StyledLink>
          )}
          {role === 'localLead' && (
            <StyledLink to={DASHBOARD_URL}>
              <Button
                label="view as local lead"
                type="light"
                width="250px"
                height="48px"
              />
            </StyledLink>
          )}
          <Button
            label="view as trainer"
            type="light"
            width="250px"
            height="48px"
          />
        </ContentWrapper>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    userName: state.auth.name,
    userId: state.auth.id,
    role: state.auth.role,
  };
};

export default connect(mapStateToProps)(DecideView);
