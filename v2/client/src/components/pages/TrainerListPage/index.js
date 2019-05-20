import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// ROUTES
import { ADD_TRAINER_URL } from '../../../constants/navigationRoutes';

// COMMON COMPONENTS
import TrainerList from '../../common/List/TrainerList';
import Header from '../../common/Header';
import Button from '../../common/Button';

// STYLING
import {
  Wrapper,
  HeaderSection,
  HeaderText,
  HeaderNumber,
} from './TrainerListPage.style.js';

export default class TrainerListPage extends Component {
  state = {
    trainerCount: 0,
    trainers: null,
    loaded: false,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios
      .get('/api/users/my-trainers')
      .then(response => {
        console.log('RES', response);
        this.setState({
          trainerCount: response.data.trainerCount,
          trainers: response.data.trainerList,
          loaded: true,
        });
      })
      .catch(err => console.error(err));
  };

  render() {
    const { trainerCount, trainers, loaded } = this.state;

    if (!loaded) return <p>Loading...</p>;
    return (
      <Wrapper>
        <Header type="section" label="trainers" />
        <HeaderSection>
          <HeaderText>Total Trainers:</HeaderText>
          <HeaderNumber>{trainerCount}</HeaderNumber>
          <Link to={ADD_TRAINER_URL}>
            <Button label="Add Trainer" type="outline" width="146px" />
          </Link>
        </HeaderSection>
        <TrainerList dataList={trainers} />
      </Wrapper>
    );
  }
}
