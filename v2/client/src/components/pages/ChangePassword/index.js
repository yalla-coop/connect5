import React, { Component } from 'react';
import { Input } from 'antd';
import { connect } from 'react-redux';
import Button from '../../common/Button';
import {
  ChangePasswordForm,
  Heading,
  H3,
  InputDiv,
  Error,
} from './ChangePassword.style';
// import history from '../../../history';

class ChangePassword extends Component {
  state = {
    fields: {},
    errors: {},
    msg: null,
  };

  // Check inputs validation then if not valide show error msg

  validateForm = () => {
    const { fields } = this.state;
    const errors = {};
    const strongRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
    );
    let formIsValid = true;

    if (!fields.oldPassword) {
      formIsValid = false;
      errors.oldPasswordError = '*Please enter your old password.';
    }

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

    if (!strongRegex.test(fields.newPassword)) {
      formIsValid = false;
      errors.newPasswordError = '*Please enter storg password.';
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
    console.log(this.state);
  };

  onFormSubmit = e => {
    const { fields } = this.state;
    e.preventDefault();
    const isValide = this.validateForm();
    if (isValide) {
      const { oldPassword } = fields;

      // call action creator then give it email and password
    }
  };

  render() {
    const { onInputChange, onFormSubmit } = this;
    const { fields, errors } = this.state;
    const { oldPassword, newPassword, reNewPassword } = fields;
    const { oldPasswordError, newPasswordError, reNewPasswordError } = errors;
    return (
      <ChangePasswordForm onSubmit={onFormSubmit}>
        <Heading>
          <H3>Change your password</H3>
        </Heading>

        <InputDiv>
          <Input.Password
            placeholder="current password"
            size="large"
            name="oldPassword"
            type="text"
            onChange={onInputChange}
            value={oldPassword}
          />
          <Error>{oldPasswordError}</Error>
        </InputDiv>

        <InputDiv>
          <Input.Password
            placeholder="new password"
            size="large"
            name="newPassword"
            type="text"
            onChange={onInputChange}
            value={newPassword}
          />
          <Error>{newPasswordError}</Error>
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
          <Error>{reNewPasswordError}</Error>
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
      </ChangePasswordForm>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  role: state.auth.role,
});

export default connect(mapStateToProps)(ChangePassword);
