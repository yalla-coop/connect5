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
          To access your surveys, please enter your email. the used email must
          be added at least in one of Connect5 sessions
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
