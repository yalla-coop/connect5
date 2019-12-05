import React from 'react';
import { Input } from 'antd';

import {
  LoginHeading,
  InputDiv,
  LoginFail,
  Content,
} from '../Login/Login.style';

const AccessSurveysTab = ({ PIN, onInputChange, error }) => {
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
    </div>
  );
};

export default AccessSurveysTab;
