import React, { Component } from 'react';
import { Input, Icon, Button } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { H3, InputDiv, LoginForm } from './Login.style';
import { loginUser } from '../../../../actions/auth';

class Login extends Component {
  state = {
    fields: {},
    errors: {},
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
    const { fields, errors } = this.state;
    const { email, password } = fields;
    const { emailError, passwordError } = errors;
    const { onInputChange, onFormSubmit } = this;
    return (
      <>
        <LoginForm onSubmit={onFormSubmit}>
          <H3>Login</H3>
          <InputDiv>
            <Input
              placeholder="Enter your email"
              name="email"
              type="text"
              value={email}
              onChange={onInputChange}
              size="large"
              suffix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />

            <div style={{ color: 'red' }}>{emailError}</div>
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
            <div style={{ color: 'red' }}>{passwordError}</div>
          </InputDiv>
          <InputDiv>
            <Button onClick={onFormSubmit} type="primary" block size="large">
              LOGIN
            </Button>
          </InputDiv>
        </LoginForm>
      </>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

export default connect(
  null,
  { loginUser }
)(Login);
