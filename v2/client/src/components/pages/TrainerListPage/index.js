import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { Modal } from 'antd';

// ROUTES
import { ADD_TRAINER_URL } from '../../../constants/navigationRoutes';

// COMMON COMPONENTS
import TrainerList from '../../common/List/TrainerList';
import Header from '../../common/Header';
import Button from '../../common/Button';
import Toggle from '../../common/Toggle';

// STYLING
import {
  Wrapper,
  HeaderSection,
  HeaderText,
  HeaderNumber,
} from './TrainerListPage.style';

const { confirm } = Modal;

class TrainerListPage extends Component {
  state = {
    trainerCount: 0,
    localLeadCount: 0,
    trainers: null,
    localLeads: null,
    loaded: false,
    toggle: 'left',
  };

  componentDidMount() {
    const { role } = this.props;
    if (role === 'admin') {
      this.adminFetchData();
    } else {
      this.localLeadFetchData();
    }
  }

  localLeadFetchData = () => {
    axios
      .get('/api/users/my-trainers')
      .then(response => {
        this.setState({
          trainerCount: response.data.trainerCount,
          trainers: response.data.trainerList,
          loaded: true,
        });
      })
      .catch(err =>
        Modal.error({
          title: 'Error',
          content: err.response.data.error,
        })
      );
  };

  adminFetchData = () => {
    axios
      .get('/api/users/admin/trainers-and-leads')
      .then(response => {
        this.setState({
          trainerCount: response.data.trainerCount,
          trainers: response.data.trainerList,
          localLeadCount: response.data.localLeadCount,
          localLeads: response.data.localLeadList,
          loaded: true,
        });
      })
      .catch(err =>
        Modal.error({
          title: 'Error',
          content: err.response.data.error,
        })
      );
  };

  clickToggle = direction => {
    this.setState({ toggle: direction });
  };

  deleteUser = async trainerId => {
    const { userId: localLeadId } = this.props;
    try {
      await axios.delete(`/api/local-lead/${localLeadId}/trainer`, {
        data: { trainerId },
      });
      this.localLeadFetchData();
    } catch (err) {
      Modal.error({
        title: 'Error',
        content: err.response.data.error,
      });
    }
  };

  showDeleteConfirm = trainerId => {
    confirm({
      title: 'Are you sure delete this trainer?',
      content: 'Delete trainer',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        this.deleteUser(trainerId);
      },
    });
  };

  render() {
    const {
      trainerCount,
      localLeadCount,
      trainers,
      localLeads,
      loaded,
      toggle,
    } = this.state;

    const { role } = this.props;

    if (!loaded) return <p>Loading...</p>;
    return (
      <Wrapper>
        <Header type="section" label="trainers" />
        <HeaderSection>
          <HeaderText>
            {toggle === 'left' ? 'Total Trainers:' : 'Total Local Leads:'}
          </HeaderText>
          <HeaderNumber>
            {toggle === 'left' ? trainerCount : localLeadCount}
          </HeaderNumber>
          {role === 'admin' && (
            <Toggle
              leftText="trainers"
              rightText="local leads"
              selected={toggle}
              onClick={this.clickToggle}
            />
          )}
          {role === 'localLead' && (
            <Link to={ADD_TRAINER_URL}>
              <Button label="Add Trainer" type="outline" width="146px" />
            </Link>
          )}
        </HeaderSection>
        <div style={{ maxWidth: '650px', margin: '0 auto', width: '100%' }}>
          <TrainerList
            dataList={toggle === 'left' ? trainers : localLeads}
            viewRole={role}
            deleteUser={this.showDeleteConfirm}
          />
        </div>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return { userId: state.auth.id };
};

export default connect(mapStateToProps)(TrainerListPage);
