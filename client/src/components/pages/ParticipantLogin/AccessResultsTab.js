import React from 'react';
import { Input } from 'antd';
import Button from '../../common/Button';

import {
  LoginHeading,
  InputDiv,
  LoginFail,
  NoAccount,
  Content,
  AnotherLink,
  Paragraph,
} from '../Login/Login.style';

const AccessSurveysTab = ({
  PIN,
  onInputChange,
  error,
  loading,
  msg,
  onFormSubmit,
}) => {
  return (
    <div>
      <LoginHeading>
        <Content style={{ color: 'red' }}>
          <strong>Important:</strong> course participants cannot register on the
          app. You need to submit at least one survey before you can log in!
        </Content>
        <Content>
          To access your results, please enter your unique pin. This is the
          third letter of your first name, the first two letters of your
          mother&apos;s first name and the date you were born (e.g., you would
          type 18 if you were born on the 18th of July)
        </Content>
      </LoginHeading>
      <InputDiv>
        <Input
          placeholder="Enter your PIN"
          name="PIN"
          type="text"
          value={PIN}
          onChange={onInputChange}
          size="large"
          pattern="^[a-z]{3}[0-9]{1,2}$"
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

export default AccessSurveysTab;
