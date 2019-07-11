import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Button } from 'antd';
import axios from 'axios';
import download from 'downloadjs';
import { connect } from 'react-redux';

import NameForm from './NameForm';
import ClaimCertificate from './ClaimCertificate';
import SucessMsg from './SucessMsg';

import { Wrapper, Paragraph, ButtonsWrapper } from './Certificate.style';

class Certificate extends Component {
  state = {
    name: 'John Rees',
    email: '',
    sendEmail: false,
    isLoading: false,
  };

  handleClick = () => {
    const { name, email } = this.state;
    const fileName = `${name}-${Date.now()}.pdf`;
    const {
      sessionType,
      date,
      trainers,
      sendEmail,
      history,
      match,
    } = this.props;
    const data = {
      name,
      email,
      sessionType,
      date,
      trainers,
      sendEmail,
    };
    this.setState({
      isLoading: true,
    });
    axios
      .post('/api/certificate', data, {
        headers: this.headers,
        responseType: 'blob',
      })
      .then(res => {
        const content = res.headers['content-type'];
        download(res.data, fileName, content);
        history.push(`/certificate/${match.params.sessionId}/success`);
      })
      .catch(err => {
        console.log('er', err);
        this.setState({
          isLoading: false,
        });
      });
  };

  getNameEmail = (name, email) => {
    this.setState({
      name,
      email,
    });
  };

  render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route
          exact
          path={`${match.path}/claim`}
          render={props => (
            <ClaimCertificate
              {...props}
              {...this.state}
              handleClick={this.handleClick}
            />
          )}
        />
        <Route
          path={match.path}
          exact
          render={props => (
            <Wrapper>
              <Paragraph onClick={this.handleClick}>
                You can get your certificate by clicking here
              </Paragraph>
              <ButtonsWrapper>
                <Link to={`${props.match.url}/download-only`}>
                  <Button type="primary" size="large" block>
                    Download only
                  </Button>
                </Link>
                <br />
                <br />
                <Link to={`${props.match.url}/download-email`}>
                  <Button type="primary" size="large" block>
                    Download and send to my email
                  </Button>
                </Link>
              </ButtonsWrapper>
            </Wrapper>
          )}
        />
        <Route
          exact
          path={`${match.path}/download-only`}
          render={props => (
            <NameForm {...props} getNameEmail={this.getNameEmail} />
          )}
        />
        <Route
          exact
          path={`${match.path}/download-email`}
          render={props => (
            <NameForm {...props} sendEmail getNameEmail={this.getNameEmail} />
          )}
        />

        <Route
          exact
          path={`${match.path}/success`}
          render={props => (
            <SucessMsg {...props} sendEmail={this.state.sendEmail} />
          )}
        />
      </Switch>
    );
  }
}

const mapStateToProps = (state, props) => {
  const currentSession = state.sessions.sessions.filter(
    ({ sessions: session }) => session._id === props.match.params.sessionId
  );
  const cleanSession = currentSession[0] && currentSession[0].sessions;
  return {
    sessionType: cleanSession && cleanSession.type,
    date: cleanSession && cleanSession.date,
    trainers: cleanSession && cleanSession.trainers,
  };
};

export default connect(mapStateToProps)(Certificate);
