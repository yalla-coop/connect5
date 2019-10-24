import React, { Component } from 'react';
import { Input } from 'antd';
import { connect } from 'react-redux';
import Button from '../../common/Button';
import Header from '../../common/Header';
import { resetPassword } from '../../../actions/users';
import {
  ForgetPasswordForm,
  Heading,
  H3,
  InputDiv,
  ErrorMsg,
} from './ForgetPassword.style';
// import history from '../../../history';

class ResetPassword extends Component {
  state = {
    fields: {},
    errors: {},
    msg: null,
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      // Check for login error
      this.checkError(error);
    }
  }

  checkError = error => {
    if (error.id === 'RESET_PASSWORD_FAIL') {
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
    const { resetPassword: resetPasswordActionCreator, match } = this.props;
    const { token } = match.params;
    const { fields } = this.state;
    const { newPassword } = fields;
    e.preventDefault();
    const isValide = this.validateForm();
    if (isValide) {
      const resetPasswordData = {
        newPassword,
        token,
      };

      // call action creator then give it email and password
      resetPasswordActionCreator(resetPasswordData);
    }
  };

  render() {
    const { onInputChange, onFormSubmit } = this;
    const { loading } = this.props;
    const { fields, errors, msg } = this.state;
    const { newPassword, reNewPassword } = fields;
    const { newPasswordError, reNewPasswordError } = errors;
    return (
      <>
        <Header type="home" />
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
                loading={loading}
              />
            </InputDiv>
            <ErrorMsg>{msg}</ErrorMsg>
          </ForgetPasswordForm>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error,
  loading: state.loading.resetPasswordLoading,
});

export default connect(
  mapStateToProps,
  { resetPassword }
)(ResetPassword);
