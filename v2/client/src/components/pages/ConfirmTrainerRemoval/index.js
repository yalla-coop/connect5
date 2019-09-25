/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
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

class ConfirmTrainerRemoval extends Component {
  state = {
    localLeadId: null,
    trainerId: null,
    localLeadDetails: {},
    loading: true,
  };

  componentDidMount() {
    const { localLead, trainer } = this.props.match.params;

    axios.get(`/api/local-lead/${localLead}`).then(({ data }) =>
      this.setState({
        localLeadId: localLead,
        trainerId: trainer,
        loading: false,
        localLeadDetails: data,
      })
    );
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
    const { loading, localLeadDetails } = this.state;
    const { name, organization } = localLeadDetails;

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
            <p>
              Clicking the button underneath will remove you from the group of
              trainers managed by
            </p>
            <p>
              {name && name} (working at {organization})
            </p>
            <Button onClick={this.handleSubmit}>
              Remove me from the group!
            </Button>
          </ContentWrapper>
        </Wrapper>
      </div>
    );
  }
}

export default connect()(ConfirmTrainerRemoval);
