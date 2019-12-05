import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'antd';
import * as Yup from 'yup';

import Button from '../../common/Button';
import HumburgerMenu from '../../common/Menu';
import logo from '../../../assets/logo.png';
import history from '../../../history';
import {
  LoginHeading,
  InputDiv,
  LoginPINForm,
  LoginFail,
  NoAccount,
  AnotherLink,
  Paragraph,
  Logo,
  H4,
} from '../Login/Login.style';
import { loginParticipant } from '../../../actions/authAction';
import AccessResultsTab from './AccessResultsTab';
import AccessSurveysTab from './AccessSurveysTab';

const { TabPane } = Tabs;
const emailSchema = Yup.string()
  .email()
  .required();

class ParticipantLogin extends Component {
  state = {
    PIN: null,
    email: null,
    activeTab: '1',
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated, location } = this.props;

    if (error !== prevProps.error) {
      // Check for login error
      this.updateLogin(error);
    }

    // If authenticated,
    if (isAuthenticated) {
      const { state } = location;
      history.push({
        pathname: '/participant-dashboard',
        state,
      });
    }
  }

  updateActiveTab = key => {
    this.setState({ activeTab: key, error: null });
  };

  updateLogin = error => {
    if (error.id === 'LOGIN_FAIL') {
      this.setState({ msg: error.msg.data.error });
    } else {
      this.setState({ msg: null });
    }
  };

  validateForm = () => {
    let formIsValid = true;
    const { PIN, email, activeTab } = this.state;
    let error = '';
    if (activeTab === '1') {
      const regex = new RegExp('^[a-z]{3}[0-9]{1,2}$', 'i');
      if (regex.test(PIN)) {
        formIsValid = true;
        error = '';
      } else {
        formIsValid = false;
        error = '*Please enter valid pin';
      }
    } else {
      try {
        const validEmail = emailSchema.validateSync(email);

        if (validEmail) {
          formIsValid = true;
          error = '';
        } else {
          formIsValid = false;
          error = '*Please enter valid email';
        }
      } catch (err) {
        formIsValid = false;
        error = '*Please enter valid email';
      }
    }
    this.setState({ error });
    return formIsValid;
  };

  onFormSubmit = e => {
    const { PIN, email, activeTab } = this.state;
    const { loginParticipant: loginParticipantActionCreator } = this.props;
    e.preventDefault();
    const isValide = this.validateForm();
    if (isValide) {
      if (activeTab === '1') {
        this.setState({ PIN: '' });
        // CALL ACTION CREATOR AND PASS IT THE VALUE
        loginParticipantActionCreator({ PIN: PIN.toUpperCase() });
      } else {
        this.setState({ email: '' });
        // CALL ACTION CREATOR AND PASS IT THE VALUE
        loginParticipantActionCreator({ email: email.toLowerCase() });
      }
    }
  };

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { PIN, error, msg, email } = this.state;
    const { onFormSubmit, onInputChange } = this;
    const { isDeskTop, loading } = this.props;
    return (
      <div style={{ paddingBottom: '4rem' }}>
        {isDeskTop && <HumburgerMenu dark="dark" />}
        <LoginHeading>
          <AnotherLink to="/">
            <Logo src={logo} alt="img" />
          </AnotherLink>
          <H4>Login to your account</H4>
        </LoginHeading>
        <LoginPINForm onSubmit={onFormSubmit}>
          <Tabs tabPosition="top" onChange={this.updateActiveTab}>
            <TabPane tab="Access Results" key="1">
              <AccessResultsTab
                PIN={PIN}
                onInputChange={onInputChange}
                error={error}
                loading={loading}
                msg={msg}
                onFormSubmit={onFormSubmit}
              />
            </TabPane>
            <TabPane tab="Access Surveys" key="2">
              <AccessSurveysTab
                email={email}
                onInputChange={onInputChange}
                error={error}
                loading={loading}
                msg={msg}
                onFormSubmit={onFormSubmit}
              />
            </TabPane>
          </Tabs>
          <InputDiv>
            <Button
              onClick={onFormSubmit}
              type="primary"
              label="LOGIN"
              height="40px"
              width="100%"
              loading={loading}
            />
          </InputDiv>
          <InputDiv>
            <LoginFail>{msg}</LoginFail>
          </InputDiv>

          <NoAccount>
            <Paragraph>
              Not a participant?{' '}
              <AnotherLink to="/login"> Login here!</AnotherLink>
            </Paragraph>
          </NoAccount>
        </LoginPINForm>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  isDeskTop: state.checkBrowserWidth.isDeskTop,
  loading: state.loading.loginParticipantsLoading,
});

export default connect(
  mapStateToProps,
  { loginParticipant }
)(ParticipantLogin);
