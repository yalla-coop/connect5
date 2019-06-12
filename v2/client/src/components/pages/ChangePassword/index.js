import React, { Component } from 'react';
import { Input } from 'antd';
import { connect } from 'react-redux';
import Button from '../../common/Button';
import {
  ChangePasswordForm,
  Heading,
  H3,
  InputDiv,
} from './ChangePassword.style';
import history from '../../../history';

class ChangePassword extends Component {
  state = {
    fields: {},
    errors: {},
    msg: null,
}

  onInputChange = e => {
    const { fields } = this.state;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields,
    });
  };

  render() {
    const { onInputChange, onFormSubmit } = this;
    return (
      <>
        <ChangePasswordForm onSubmit={onFormSubmit}>
          <Heading>
            <H3>Change your password</H3>
          </Heading>

          <InputDiv>
            <Input.Password
              placeholder="current password"
              size="large"
              name="password"
              type="text"
              value={password}
              onChange={onInputChange}
            />
          </InputDiv>

          <InputDiv>
            <Input.Password
              placeholder="new password"
              size="large"
              name="password"
              type="text"
              value={newPassword}
              onChange={onInputChange}
            />
          </InputDiv>

          <InputDiv>
            <Input.Password
              placeholder="confirm new password"
              size="large"
              name="password"
              type="text"
              value={newPassword}
              onChange={onInputChange}
            />
          </InputDiv>
      </ChangePasswordForm>
      <>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(
mapStateToProps,
)(ChangePassword);
