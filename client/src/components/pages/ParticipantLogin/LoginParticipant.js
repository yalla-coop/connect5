import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from 'antd';
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
  Content,
  AnotherLink,
  Paragraph,
  Logo,
  H4,
} from './Login.style';
import { loginParticipant } from '../../../actions/authAction';

class ParticipantLogin extends Component {
  state = {
    PIN: ''
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

  updateLogin = error => {
    if (error.id === 'LOGIN_FAIL') {
      this.setState({ msg: error.msg.data.error });
    } else {
      this.setState({ msg: null });
    }
  };

  validateForm = () => {
    let formIsValid = true;
    const { PIN } = this.state;
    let error = '';
    const regex = new RegExp('^[a-z]{3}[0-9]{1,2}$', 'i');
    if (regex.test(PIN)) {
      formIsValid = true;
      error = '';
    } else {
      formIsValid = false;
      error = '*Please enter valid pin';
    }
    this.setState({ error });
    return formIsValid;
  };

  onFormSubmit = e => {
    const { PIN } = this.state;
    const { loginParticipant: loginParticipantActionCreator } = this.props;
    e.preventDefault();
    const isValide = this.validateForm();
    if (isValide) {
      this.setState({ PIN: '' });
      // CALL ACTION CREATOR AND PASS IT THE VALUE
      loginParticipantActionCreator(PIN.toUpperCase());
    }
  };

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { PIN, error, msg } = this.state;
    const { onFormSubmit, onInputChange } = this;
    const { isDeskTop, loading } = this.props;
    return (
      <>
        {isDeskTop && <HumburgerMenu dark="dark" />}
        <LoginHeading>
          <AnotherLink to="/">
            <Logo src={logo} alt="img" />
          </AnotherLink>
          <H4>Login to your account</H4>
        </LoginHeading>
        <LoginPINForm onSubmit={onFormSubmit}>
          <LoginHeading>
            <Content style={{ color: 'red' }}>
              <strong>Important:</strong> course participants cannot register on
              the app. You need to submit at least one survey before you can log
              in!
            </Content>
            <Content>
              To access your results, please enter your unique pin. This is the
              third letter of your first name, the first two letters of your
              mother's first name and the date you were born (e.g., you would
              type 18 if you were born on the 18th of July)
            </Content>
          </LoginHeading>
          <InputDiv>
            <Input
              placeholder="Enter your PIN"
              name="PIN"
              type="text"
              value={PIN}
              onChange={onInputChange}
              size="large"
              pattern="^[a-z]{3}[0-9]{1,2}$"
              required
            />
            <LoginFail>{error}</LoginFail>
          </InputDiv>
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
      </>
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
