import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from 'antd';
import Button from '../../common/Button';
import history from '../../../history';
import {
  LoginWrapper,
  InputDiv,
  LoginForm,
  LoginFail,
  NoAccount,
  Content,
  AnotherLink,
  Paragraph,
  Space,
} from './Login.style';
import { loginParticipant } from '../../../actions/authAction';

class ParticipantLogin extends Component {
  state = {
    PIN: '',
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for login error
      this.updateLogin(error);
    }

    // If authenticated,
    if (isAuthenticated) {
      history.push('/participant-dashboard');
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
    return (
      <>
        <Space />
        <LoginWrapper>
          <LoginForm onSubmit={onFormSubmit}>
            <Content>
              {`To access your results, please enter your unique pin. This is the
              third letter of your first name, the first two letters of your
              mother's first name and the date you were born (e.g., you would
              type 18 if you were born on the 18th of July)`}
            </Content>
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
              />
            </InputDiv>
          </LoginForm>
          <InputDiv>
            <LoginFail>{msg}</LoginFail>
          </InputDiv>
          <NoAccount>
            <Paragraph>
              Not a participant?{' '}
              <AnotherLink to="/login"> LOGIN HERE!</AnotherLink>
            </Paragraph>
          </NoAccount>
        </LoginWrapper>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(
  mapStateToProps,
  { loginParticipant }
)(ParticipantLogin);
