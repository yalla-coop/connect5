import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, Modal, Input } from 'antd';

import Swal from 'sweetalert2';
import {
  fetchLocalLeads as fetchLocalLeadsAction,
  updateUserInfo as updateUserInfoAction,
  fetchStatsData,
} from '../../../actions/users';

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

const captalizesName = name => name && name[0].toUpperCase() + name.substr(1);

const { Option, OptGroup } = Select;

class MyProfile extends Component {
  state = {
    organization: null,
    localLead: null,
    visible: false,
    activeStatus: '',
  };

  componentDidMount() {
    const { fetchLocalLeads } = this.props;
    fetchLocalLeads();
  }

  componentDidUpdate(prevProps) {
    const {
      organization: currentOrganization,
      localLead: currentLocalLead,
    } = this.props;
    const {
      organization: prevOrganization,
      localLead: prevLocalLead,
    } = prevProps;
    if (currentOrganization !== prevOrganization) {
      this.updateState({ organization: currentOrganization });
    }
    if (currentLocalLead !== prevLocalLead) {
      this.updateState({ localLead: currentLocalLead });
    }
  }

  updateState = data => {
    this.setState(data);
  };

  showModal = key => {
    const { organization } = this.props;
    this.setState({
      visible: true,
      activeStatus: key,
      organization,
    });
  };

  handleOk = () => {
    const {
      localLead: localLeadState,
      organization: organizationState,
    } = this.state;

    const {
      localLead: localLeadProps,
      organization: organizationProps,
      updateUserInfo,
    } = this.props;

    const data = {};

    if (localLeadProps !== localLeadState) {
      data.localLead = localLeadState;
    }

    if (organizationProps !== organizationState) {
      data.organization = organizationState;
    }

    if (Object.keys(data).length > 0) {
      updateUserInfo(data, this.updateState);
    }
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleChangeOrg = e => {
    const { value } = e.target;
    this.setState({ organization: value });
  };

  handleChangeLocalLead = localLead => {
    this.setState({ localLead });
  };

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
    const { deleteAccount } = this;
    const {
      userName,
      role,
      region,
      email,
      localLeadsList,
      localLead,
      organization,
      userId,
    } = this.props;

    const {
      visible,
      activeStatus,
      updateUserLoading,
      organization: organizationState,
    } = this.state;

    const [trainerLocalLead] = localLeadsList.filter(
      item => item._id === localLead
    );

    const groupedLocalLeads = {};
    localLeadsList.forEach(item => {
      groupedLocalLeads[item.region] = groupedLocalLeads[item.region]
        ? groupedLocalLeads[item.region.toLowerCase()]
        : [];

      groupedLocalLeads[item.region].push({
        name: captalizesName(item.name),
        _id: item._id,
      });
    });

    return (
      <Wrapper>
        <Header type="section" label="My Profile" />
        <DetailsContent>
          <Row>
            <Detail>
              <BoldSpan>Name: </BoldSpan>
              {captalizesName(userName)}
            </Detail>
          </Row>
          <Row>
            <Detail>
              <BoldSpan>Email: </BoldSpan>
              {email}
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
              <BoldSpan onClick={() => this.showModal('Organisation')} pointer>
                Edit
              </BoldSpan>
            </Detail>
          </Row>

          <Row>
            <Detail>
              <BoldSpan>Local lead: </BoldSpan>
              {captalizesName(trainerLocalLead && trainerLocalLead.name) ||
                'N/A'}
            </Detail>
            <Detail>
              <BoldSpan onClick={() => this.showModal('Local Lead')} pointer>
                Edit
              </BoldSpan>
            </Detail>
          </Row>
        </DetailsContent>
        <DeteteAccountBtn onClick={() => deleteAccount(userId, role)}>
          Delete My Account
        </DeteteAccountBtn>

        <Modal
          title={`Edit ${activeStatus}`}
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={updateUserLoading}
          onCancel={this.handleCancel}
        >
          {activeStatus === 'Organisation' ? (
            <Input
              placeholder="Organisation"
              onChange={this.handleChangeOrg}
              value={organizationState}
            />
          ) : (
            <Select
              defaultValue={captalizesName(
                trainerLocalLead && trainerLocalLead.name
              )}
              style={{ width: 200 }}
              onChange={this.handleChangeLocalLead}
            >
              {Object.keys(groupedLocalLeads).map(item => (
                <OptGroup label={item}>
                  {groupedLocalLeads[item].map(_localLead => (
                    <Option value={_localLead._id}>{_localLead.name}</Option>
                  ))}
                </OptGroup>
              ))}
            </Select>
          )}
        </Modal>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    userName: state.auth.name,
    email: state.auth.email,
    userId: state.auth.id,
    role: state.auth.role,
    organization: state.auth.organization,
    region: state.auth.region,
    localLead: state.auth.localLead,
    localLeadsList: state.fetchedData.localLeadsList,
    updateUserLoading: state.loading.updateUserLoading,
  };
};

export default connect(
  mapStateToProps,
  {
    fetchLocalLeads: fetchLocalLeadsAction,
    updateUserInfo: updateUserInfoAction,
    fetchStatsData,
    logout,
    deleteAccountAction,
    fetchLocalLeads: fetchLocalLeadsAction,
  }
)(MyProfile);
