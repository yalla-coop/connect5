import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchStatsData } from '../../../actions/users';
import { logout } from '../../../actions/authAction';

// STYLING
import {
  Wrapper,
  DetailsContent,
  Detail,
  BoldSpan,
  Row,
} from './MyProfile.style';

//  COMMON COMPONENTS
import Header from '../../common/Header';

class MyProfile extends Component {
  componentDidMount() {}

  render() {
    const { userName, role, organization, region } = this.props;

    const captalizesName =
      userName && userName[0].toUpperCase() + userName.substr(1);

    return (
      <Wrapper>
        <Header type="home" />
        <DetailsContent>
          <Row>
            <Detail>
              <BoldSpan>Name: </BoldSpan>
              {captalizesName}
            </Detail>
          </Row>
          <Row>
            <Detail>
              <BoldSpan>Role: </BoldSpan>
              {role}
            </Detail>
          </Row>
          <Row>
            <Detail>
              <BoldSpan>Region: </BoldSpan>
              {region || 'N/A'}
            </Detail>
          </Row>
          <Row>
            <Detail>
              <BoldSpan>Organisation: </BoldSpan>
              {organization || 'N/A'}
            </Detail>
            <Detail>
              <BoldSpan>Edit</BoldSpan>
            </Detail>
          </Row>
        </DetailsContent>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    userName: state.auth.name,
    userId: state.auth.id,
    role: state.auth.role,
    organization: state.auth.organization,
    region: state.auth.region,
    viewLevel: state.viewLevel.viewLevel,
  };
};

export default connect(
  mapStateToProps,
  { fetchStatsData, logout }
)(MyProfile);
