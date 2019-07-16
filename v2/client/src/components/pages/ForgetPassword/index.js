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
} from './ForgetPassword.style';
// import history from '../../../history';

class ForgetPassword extends Component {
  state = {
    email: '',
    errors: {},
    msg: null,
  };

  // Check inputs validation then if not valide show error msg
  //
  // validateForm = () => {
  //   const { email } = this.state;
  //   const errors = {};
  //   let formIsValid = true;
  //   if (!email) {
  //     formIsValid = false;
  //     errors.emailError = '*Please enter your email';
  //   }
  //
  //   if (typeof email !== 'undefined') {
  //     // regular expression for email validation
  //     const pattern = new RegExp(
  //       /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  //     );
  //     if (!pattern.test(email)) {
  //       formIsValid = false;
  //       errors.emailError = '*Please enter valid email.';
  //     }
  //   }
  //
  //   this.setState({
  //     errors,
  //   });
  //   return formIsValid;
  // };
  //
  // onFormSubmit = e => {
  //   // const { email } = this.state;
  //   e.preventDefault();
  //   const isValide = this.validateForm();
  //   if (isValide) {
  //     // call action creator then give it email and password
  //   }
  // };
  //
  // onInputChange = e => {
  //   this.setState({
  //     email: e.target.value,
  //   });
  //   console.log(this.state, 'sssssssssssssss');
  // };

  render() {
    const { email, errors, msg } = this.state;
    const { emailError } = errors;
    const { onInputChange, onFormSubmit } = this;
    return (
      <div style={{ paddingTop: '6rem' }}>
        <LoginForm onSubmit={onFormSubmit}>
          <LoginHeading>
            <H3>Forget Your Password</H3>
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
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   isAuthenticated: state.auth.isAuthenticated,
//   error: state.error,
//   role: state.auth.role,
// });

export default connect(null)(ForgetPassword);
