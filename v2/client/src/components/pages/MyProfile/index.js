import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, Modal, Button, Input } from 'antd';
import Swal from 'sweetalert2';

import {
  fetchStatsData,
  fetchLocalLeads as fetchLocalLeadsAction,
} from '../../../actions/users';
import { logout } from '../../../actions/authAction';
import { deleteAccountAction } from '../../../actions/deleteAccountAction';
import { fetchAllTrainers as fetchAllTrainersAction } from '../../../actions/trainerAction';

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
    visible: false,
    setOrgLoading: false,
    activeStatus: '',
  };

  componentDidMount() {
    const { fetchLocalLeads } = this.props;
    fetchLocalLeads();
  }

  componentDidUpdate(prevProps) {
    const { organization: currentOrganization } = this.props;
    const { organization: prevOrganization } = prevProps;
    if (currentOrganization !== prevOrganization) {
      this.setOrgs(currentOrganization);
    }
  }

  setOrgs = currentOrganization => {
    this.setState({ organization: currentOrganization });
  };

  showModal = key => {
    this.setState({
      visible: true,
      activeStatus: key,
    });
  };

  handleOkLocalLead = () => {
    this.setState({
      setLocalLeadLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        setLocalLeadLoading: false,
      });
    }, 2000);
  };

  handleOkOrg = () => {
    this.setState({
      setOrgLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        setOrgLoading: false,
      });
    }, 2000);
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleChangeOrg = e => {
    const { value } = e.target;
    this.setOrgs(value);
  };

  handleChangeLocalLead = e => {
    console.log(e);
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
      setOrgLoading,
      activeStatus,
      setLocalLeadLoading,
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
              <BoldSpan onClick={() => this.showModal('Organisation')}>
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
              <BoldSpan onClick={() => this.showModal('Local Lead')}>
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
          onOk={
            activeStatus === 'Organisation'
              ? this.handleOkOrg
              : this.handleOkLocalLead
          }
          confirmLoading={
            activeStatus === 'Organisation'
              ? setOrgLoading
              : setLocalLeadLoading
          }
          onCancel={this.handleCancel}
        >
          {activeStatus === 'Organisation' ? (
            <Input placeholder="Organisation" onChange={this.handleChangeOrg} />
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
  };
};

export default connect(
  mapStateToProps,
  {
    fetchStatsData,
    logout,
    deleteAccountAction,
    fetchLocalLeads: fetchLocalLeadsAction,
  }
)(MyProfile);
