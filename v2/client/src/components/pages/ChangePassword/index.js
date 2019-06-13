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
// import history from '../../../history';

class ChangePassword extends Component {
  state = {
    fields: {},
    errors: {},
    msg: null,
  };

  onInputChange = e => {
    const { fields } = this.state;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields,
    });
    console.log(this.state);
  };

  render() {
    const { onInputChange, onFormSubmit } = this;
    return (
      <ChangePasswordForm onSubmit={onFormSubmit}>
        <Heading>
          <H3>Change your password</H3>
        </Heading>

        <InputDiv>
          <Input.Password
            placeholder="current password"
            size="large"
            name="current password"
            type="text"
            onChange={onInputChange}
          />
        </InputDiv>

        <InputDiv>
          <Input.Password
            placeholder="new password"
            size="large"
            name="new password"
            type="text"
            onChange={onInputChange}
          />
        </InputDiv>

        <InputDiv>
          <Input.Password
            placeholder="confirm new password"
            size="large"
            name="confirm new password"
            type="text"
            onChange={onInputChange}
          />
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
