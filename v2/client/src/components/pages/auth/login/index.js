import React, { Component } from 'react';
import { Input, Button } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  LoginHeading,
  H3,
  InputDiv,
  LoginForm,
  LoginFail,
  NoAccount,
  RegisterLink,
} from './Login.style';
import { loginUser } from '../../../../actions/authAction';
import { clearErrors } from '../../../../actions/errorAction';
import history from '../../../../history';

class Login extends Component {
  state = {
    fields: {},
    errors: {},
    msg: null,
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for login error
      this.updateLogin(error);
    }

    // If authenticated,
    if (isAuthenticated) {
      history.push('/');
    }
  }

  updateLogin = error => {
    if (error.id === 'LOGIN_FAIL') {
      this.setState({ msg: error.msg.error });
    } else {
      this.setState({ msg: null });
    }
  };
  // Check inputs validation then if not valide show error msg

  validateForm = () => {
    const { fields } = this.state;
    const errors = {};
    let formIsValid = true;
    if (!fields.email) {
      formIsValid = false;
      errors.emailError = '*Please enter your email';
    }

    if (typeof fields.email !== 'undefined') {
      // regular expression for email validation
      const pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(fields.email)) {
        formIsValid = false;
        errors.emailError = '*Please enter valid email.';
      }
    }

    if (!fields.password) {
      formIsValid = false;
      errors.passwordError = '*Please enter your password.';
    }

    if (fields.password.length < 6) {
      formIsValid = false;
      errors.passwordError = '*Password is too short.';
    }

    this.setState({
      errors,
    });
    return formIsValid;
  };

  onFormSubmit = e => {
    e.preventDefault();
    const isValide = this.validateForm();
    if (isValide) {
      const fields = {};
      fields.email = '';
      fields.password = '';
      this.setState({ fields });
    }
    const { email, password } = this.state.fields;
    const loginData = { email, password };

    // call action creator then give it email and password
    this.props.loginUser(loginData);
  };

  onInputChange = e => {
    const { fields } = this.state;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields,
    });
  };

  render() {
    const { fields, errors, msg } = this.state;
    const { email, password } = fields;
    const { emailError, passwordError } = errors;
    const { onInputChange, onFormSubmit } = this;
    return (
      <>
        <LoginForm onSubmit={onFormSubmit}>
          <LoginHeading>
            <H3>Login</H3>
          </LoginHeading>
          <InputDiv>
            <Input
              placeholder="Enter your email"
              name="email"
              type="text"
              value={email}
              onChange={onInputChange}
              size="large"
            />

            <LoginFail>{emailError}</LoginFail>
          </InputDiv>
          <InputDiv>
            <Input.Password
              placeholder="input password"
              size="large"
              name="password"
              type="text"
              value={password}
              onChange={onInputChange}
            />
            <LoginFail>{passwordError}</LoginFail>
          </InputDiv>
          <InputDiv>
            <Button onClick={onFormSubmit} type="primary" block size="large">
              LOGIN
            </Button>
          </InputDiv>

          <LoginFail>{msg}</LoginFail>
        </LoginForm>

        <NoAccount>
          <p>
            Don't have an account:{' '}
            <RegisterLink to="/"> Register Now</RegisterLink>
          </p>
        </NoAccount>
      </>
    );
  }
}

Login.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(
  mapStateToProps,
  { loginUser, clearErrors }
)(Login);
