import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

export default class TrainerListPage extends Component {
  state = {
    trainerCount: 0,
    localLeadCount: 0,
    trainers: null,
    localLeads: null,
    loaded: false,
    toggle: 'left',
    userType: 'admin',
  };

  componentDidMount() {
    const { userType } = this.state;
    if (userType === 'admin') {
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
      .catch(err => console.error(err));
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
      .catch(err => console.error(err));
  };

  clickToggle = direction => {
    this.setState({ toggle: direction });
  };

  render() {
    const {
      trainerCount,
      localLeadCount,
      trainers,
      localLeads,
      loaded,
      toggle,
      userType,
    } = this.state;
    // NOTE: userType is temp and will change once we have log in set up

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
          {userType === 'admin' && (
            <Toggle
              leftText="trainers"
              rightText="local leads"
              selected={toggle}
              onClick={this.clickToggle}
            />
          )}
          {userType === 'localLead' && (
            <Link to={ADD_TRAINER_URL}>
              <Button label="Add Trainer" type="outline" width="146px" />
            </Link>
          )}
        </HeaderSection>
        <TrainerList dataList={toggle === 'left' ? trainers : localLeads} />
      </Wrapper>
    );
  }
}
