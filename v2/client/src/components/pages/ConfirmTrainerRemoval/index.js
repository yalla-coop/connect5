/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Modal } from 'antd';
import history from '../../../history';
import {
  Wrapper,
  ContentWrapper,
  HeadlineDiv,
  AnotherLink,
  Logo,
  Button,
} from './ConfirmTrainerRemoval.style';

import logo from '../../../assets/logo.png';

export default class ConfirmTrainerRemoval extends Component {
  state = { localLeadId: null, trainerId: null, loading: true };

  componentDidMount() {
    this.setState({
      localLeadId: window.location.href.split('/')[4],
      trainerId: window.location.href.split('/')[5],
      loading: false,
    });
  }

  handleSubmit = async e => {
    e.preventDefault();

    const { localLeadId, trainerId } = this.state;

    try {
      await axios.delete(`/api/remove/${localLeadId}/${trainerId}`).then(() => {
        Swal.fire({
          title: 'success',
          text: 'You were successfully removed from the group!',
          type: 'success',
          confirmButtonText: 'Ok',
        });
        history.push(`/login/`);
      });
    } catch (err) {
      Modal.error({
        title: 'Error',
        content: 'Internal server Error',
      });
    }
  };

  render() {
    const { loading } = this.state;
    if (loading) return <p>Loading...</p>;
    return (
      <div>
        <Wrapper>
          <ContentWrapper>
            <HeadlineDiv>
              <AnotherLink to="/">
                <Logo src={logo} alt="img" />
              </AnotherLink>
            </HeadlineDiv>
            <Button onClick={this.handleSubmit}>
              Remove me from the group of trainers!
            </Button>
          </ContentWrapper>
        </Wrapper>
      </div>
    );
  }
}
