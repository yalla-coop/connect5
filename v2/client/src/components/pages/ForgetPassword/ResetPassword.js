import React, { Component } from 'react';
import { Input } from 'antd';
import { connect } from 'react-redux';
import Button from '../../common/Button';
import { resetPassword } from '../../../actions/users';
import {
  ForgetPasswordForm,
  Heading,
  H3,
  InputDiv,
  ErrorMsg,
} from './ForgetPassword.style';
import history from '../../../history';

class ResetPassword extends Component {
  state = {
    fields: {},
    errors: {},
    msg: null,
  };

  // Check inputs validation then if not valide show error msg

  validateForm = () => {
    const { fields } = this.state;
    const errors = {};

    let formIsValid = true;

    if (!fields.newPassword) {
      formIsValid = false;
      errors.newPasswordError = '*Please enter your new password.';
    }

    if (!fields.reNewPassword) {
      formIsValid = false;
      errors.reNewPasswordError = '*Please confirm your new password.';
    }

    if (fields.newPassword < 6) {
      formIsValid = false;
      errors.newPasswordError = '*New password is too short.';
    }

    if (fields.newPassword && fields.reNewPassword) {
      if (fields.newPassword !== fields.reNewPassword) {
        formIsValid = false;
        errors.reNewPasswordError = '*Password is not match.';
      }
    }
    this.setState({
      errors,
    });
    return formIsValid;
  };

  onInputChange = e => {
    const { fields } = this.state;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields,
    });
  };

  onFormSubmit = e => {
    const { token } = history.match.params;
    console.log(token);
    const { fields } = this.state;
    const { newPassword } = fields;
    const { resetPassword: resetPasswordActionCreator } = this.props;
    e.preventDefault();
    const isValide = this.validateForm();
    if (isValide) {
      const resetPasswordData = {
        newPassword,
      };

      // call action creator then give it email and password
      resetPasswordActionCreator(resetPasswordData);
    }
  };

  render() {
    const { onInputChange, onFormSubmit } = this;
    const { fields, errors, msg } = this.state;
    const { newPassword, reNewPassword } = fields;
    const { newPasswordError, reNewPasswordError } = errors;
    return (
      <div style={{ paddingTop: '6rem' }}>
        <ForgetPasswordForm onSubmit={onFormSubmit}>
          <Heading>
            <H3>Reset your password</H3>
          </Heading>

          <InputDiv>
            <Input.Password
              placeholder="new password"
              size="large"
              name="newPassword"
              type="text"
              onChange={onInputChange}
              value={newPassword}
            />
            <ErrorMsg>{newPasswordError}</ErrorMsg>
          </InputDiv>

          <InputDiv>
            <Input.Password
              placeholder="confirm new password"
              size="large"
              name="reNewPassword"
              type="text"
              onChange={onInputChange}
              value={reNewPassword}
            />
            <ErrorMsg>{reNewPasswordError}</ErrorMsg>
          </InputDiv>

          <InputDiv>
            <Button
              onClick={onFormSubmit}
              type="primary"
              label="Submit"
              height="40px"
              width="100%"
            />
          </InputDiv>
          <ErrorMsg>{msg}</ErrorMsg>
        </ForgetPasswordForm>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { resetPassword }
)(ResetPassword);
