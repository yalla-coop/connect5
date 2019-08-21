import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

import { fetchStatsData } from '../../../actions/users';
import { logout } from '../../../actions/authAction';
import { deleteAccountAction } from '../../../actions/deleteAccountAction';

// STYLING
import {
  Wrapper,
  DetailsContent,
  Detail,
  BoldSpan,
  Row,
  DeteteAccountBtn,
} from './MyProfile.style';

//  COMMON COMPONENTS
import Header from '../../common/Header';

class MyProfile extends Component {
  componentDidMount() {}

  deleteAccount = (userId, role) => {
    const { deleteAccountAction: deleteAccountActionCreator } = this.props;
    if (role === 'trainer' || role === 'localLead') {
      Swal.fire({
        title: 'Are you sure that you want to delete your account?',
        text: "You won't be able to revert this!",
        type: 'warning',
        confirmButtonText: 'Delete',
        showCancelButton: true,
        fontSize: '1.6rem !important',
      })
        .then(willDelete => {
          if (willDelete.value) {
            deleteAccountActionCreator(userId);
          }
        })
        .catch(() => {
          Swal.fire('Oops!', 'Something error in deleting your account');
        });
    }
  };

  render() {
    const { userName, role, organization, region, userId } = this.props;
    const { deleteAccount } = this;

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
        <DeteteAccountBtn onClick={() => deleteAccount(userId, role)}>
          Delete My Account
        </DeteteAccountBtn>
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
  { fetchStatsData, logout, deleteAccountAction }
)(MyProfile);
