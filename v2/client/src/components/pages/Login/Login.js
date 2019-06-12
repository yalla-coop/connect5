import React, { Component } from 'react';
import { Input } from 'antd';
import { connect } from 'react-redux';
import Button from '../../common/Button';
import {
  LoginHeading,
  H3,
  InputDiv,
  LoginForm,
  LoginFail,
  NoAccount,
  AnotherLink,
} from './Login.style';
import { loginUser } from '../../../actions/authAction';
import { clearErrors } from '../../../actions/errorAction';
import history from '../../../history';

// ROUTES
import {
  DASHBOARD_URL,
  DECIDE_VIEW_URL,
} from '../../../constants/navigationRoutes';

class Login extends Component {
  state = {
    fields: {},
    errors: {},
    msg: null,
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated, role } = this.props;
    if (error !== prevProps.error) {
      // Check for login error
      this.updateLogin(error);
    }

    // If authenticated,
    if (isAuthenticated) {
      role === "trainer " ? history.push(DASHBOARD_URL) : history.push(DECIDE_VIEW_URL);
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

    if (fields.password < 6) {
      formIsValid = false;
      errors.passwordError = '*Password is too short.';
    }

    this.setState({
      errors,
    });
    return formIsValid;
  };

  onFormSubmit = e => {
    const { fields } = this.state;
    const { loginUser: loginUserActionCreator } = this.props;
    e.preventDefault();
    const isValide = this.validateForm();
    if (isValide) {
      const { email, password } = fields;
      const loginData = { email, password };

      // call action creator then give it email and password
      loginUserActionCreator(loginData);
    }
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
            <Button
              onClick={onFormSubmit}
              type="primary"
              label="LOGIN"
              height="40px"
              width="100%"
            />
          </InputDiv>

          <LoginFail>{msg}</LoginFail>
        </LoginForm>

        <NoAccount>
          <p>
            {"Don't have an account? "}
            <AnotherLink to="/signup"> Sign Up!</AnotherLink>
          </p>
          <p>
            Course participant?
            <AnotherLink to="/participant-login"> Login here!</AnotherLink>
          </p>
        </NoAccount>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  role: state.auth.role,
});

export default connect(
  mapStateToProps,
  { loginUser, clearErrors }
)(Login);
