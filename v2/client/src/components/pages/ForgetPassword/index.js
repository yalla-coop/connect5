import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'antd';
import { connect } from 'react-redux';
import Button from '../../common/Button';
import Header from '../../common/Header';
import {
  Heading,
  H3,
  InputDiv,
  ForgetPasswordForm,
  ErrorMsg,
  Hint,
  ButtonsDiv,
  StyledLink,
} from './ForgetPassword.style';

import { checkUserByEmail } from '../../../actions/users';
// import history from '../../../history';

class ForgetPassword extends Component {
  state = {
    email: '',
    errors: {},
    msg: null,
  };

  // Check inputs validation then if not valide show error msg

  validateForm = () => {
    const { email } = this.state;
    const errors = {};
    let formIsValid = true;
    if (!email) {
      formIsValid = false;
      errors.emailError = '*Please enter your email';
    }

    if (typeof email !== 'undefined') {
      // regular expression for email validation
      const pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(email)) {
        formIsValid = false;
        errors.emailError = '*Please enter valid email.';
      }
    }

    this.setState({
      errors,
    });
    return formIsValid;
  };

  onFormSubmit = e => {
    const { email } = this.state;
    const { checkUserByEmail: checkUserByEmailActionCreator } = this.props;
    e.preventDefault();
    const isValide = this.validateForm();
    if (isValide) {
      // call action creator then give it email
      checkUserByEmailActionCreator(email);
    }
  };

  onInputChange = e => {
    this.setState({
      email: e.target.value,
    });
  };

  render() {
    const { email, errors, msg } = this.state;
    const { emailError } = errors;
    const { onInputChange, onFormSubmit } = this;
    return (
      <>
        <Header type="home" />
        <div style={{ paddingTop: '7rem' }}>
          <ForgetPasswordForm onSubmit={onFormSubmit}>
            <Heading>
              <H3>Forget Your Password!</H3>
              <Hint>
                Please enter your email adress and we'll send you instructions
                on how to reset your password
              </Hint>
            </Heading>

            <InputDiv>
              <Input
                placeholder="Enter your email"
                name="email"
                type="text"
                value={email}
                onChange={onInputChange}
                size="large"
              />

              <ErrorMsg>{emailError}</ErrorMsg>
            </InputDiv>
            <ButtonsDiv>
              <StyledLink to="/login">Cancel</StyledLink>

              <Button
                onClick={onFormSubmit}
                type="primary"
                label="Reset Password"
                height="40px"
                width="65%"
                marginLeft="5px"
              />
            </ButtonsDiv>

            <ErrorMsg>{msg}</ErrorMsg>
          </ForgetPasswordForm>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isEmailUnique: state.auth.isEmailUnique,
    checkedUserInfo: state.auth.checkedUserInfo,
  };
};

export default connect(
  mapStateToProps,
  { checkUserByEmail }
)(ForgetPassword);
