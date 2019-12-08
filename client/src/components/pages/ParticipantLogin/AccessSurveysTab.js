import React from 'react';
import { Input } from 'antd';

import {
  LoginHeading,
  InputDiv,
  LoginFail,
  Content,
} from '../Login/Login.style';

const AccessResultsTab = ({ email, onInputChange, error }) => {
  return (
    <div>
      <LoginHeading>
        <Content>
          To access relevant surveys, please enter your email below. Please note
          that your email address must be registered for the respective Connect5
          training session before you can log in.
        </Content>
      </LoginHeading>
      <InputDiv>
        <Input
          placeholder="Enter your Email"
          name="email"
          type="email"
          value={email}
          onChange={onInputChange}
          size="large"
          required
        />
        <LoginFail>{error}</LoginFail>
      </InputDiv>
    </div>
  );
};

export default AccessResultsTab;
