import React from 'react';
import { Input } from 'antd';
import Button from '../../common/Button';

import {
  LoginHeading,
  InputDiv,
  LoginFail,
  Content,
} from '../Login/Login.style';

const AccessResultsTab = ({
  email,
  onInputChange,
  error,
  loading,
  msg,
  onFormSubmit,
}) => {
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
      <InputDiv>
        <Button
          onClick={onFormSubmit}
          type="primary"
          label="LOGIN"
          height="40px"
          width="100%"
          loading={loading}
        />
      </InputDiv>
      <InputDiv>
        <LoginFail>{msg}</LoginFail>
      </InputDiv>
    </div>
  );
};

export default AccessResultsTab;
