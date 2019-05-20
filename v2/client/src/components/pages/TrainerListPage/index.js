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
    trainers: null,
    loaded: false,
    toggle: 'left',
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
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

  clickToggle = () => {
    const { toggle } = this.state;
    if (toggle === 'left') this.setState({ toggle: 'right' });
    else this.setState({ toggle: 'left' });
  };

  render() {
    const { trainerCount, trainers, loaded, toggle } = this.state;

    // this is temp and will change once we have log in set up
    const userType = 'localLead';

    if (!loaded) return <p>Loading...</p>;
    return (
      <Wrapper>
        <Header type="section" label="trainers" />
        <HeaderSection>
          <HeaderText>Total Trainers:</HeaderText>
          <HeaderNumber>{trainerCount}</HeaderNumber>
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
        <TrainerList dataList={trainers} />
      </Wrapper>
    );
  }
}
