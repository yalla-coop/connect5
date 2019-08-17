import React, { Component } from 'react';
import { Input } from 'antd';
import { connect } from 'react-redux';
import Button from '../../common/Button';
import Header from '../../common/Header';
import { changePasswordActionCreator } from '../../../actions/changePasswordAction';
import {
  ChangePasswordForm,
  Heading,
  H3,
  InputDiv,
  Error,
  BackContainer,
  BackLink,
} from './ChangePassword.style';
import history from '../../../history';

class ChangePassword extends Component {
  state = {
    fields: {},
    errors: {},
    msg: null,
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      // Check for new error
      this.checkError(error);
    }
  }

  checkError = error => {
    if (error.id === 'CHANGE_PASSWORD_FAIL') {
      this.setState({ msg: error.msg.error });
    } else {
      this.setState({ msg: null });
    }
  };

  // Check inputs validation then if not valide show error msg

  validateForm = () => {
    const { fields } = this.state;
    const errors = {};
    // const strongRegex = new RegExp(
    //   '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
    // );
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

    // if (!strongRegex.test(fields.newPassword)) {
    //   formIsValid = false;
    //   errors.newPasswordError = '*Please enter storg password.';
    // }

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
    const { fields } = this.state;
    const { oldPassword, newPassword, reNewPassword } = fields;
    const {
      userId,
      changePasswordActionCreator: changePasswordAction,
    } = this.props;
    e.preventDefault();
    const isValide = this.validateForm();
    if (isValide) {
      const changePasswordData = {
        oldPassword,
        newPassword,
        reNewPassword,
        userId,
      };

      // call action creator then give it email and password
      changePasswordAction(changePasswordData);
    }
  };

  render() {
    const { onInputChange, onFormSubmit } = this;
    const { fields, errors, msg } = this.state;
    const { oldPassword, newPassword, reNewPassword } = fields;
    const { oldPasswordError, newPasswordError, reNewPasswordError } = errors;
    return (
      <>
        <Header type="home" />
        <div style={{ paddingTop: '4rem' }} />
        <BackContainer>
          <BackLink onClick={history.goBack}>{`< Back`}</BackLink>
        </BackContainer>
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
          <Error>{msg}</Error>
        </ChangePasswordForm>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  userId: state.auth.id,
  error: state.error,
  role: state.auth.role,
});

export default connect(
  mapStateToProps,
  { changePasswordActionCreator }
)(ChangePassword);
