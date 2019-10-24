import React, { Component } from 'react';

import {
  LoginHeading,
  H4,
  Logo,
} from '../../pages/Login/Login.style';

import logo from '../../../assets/logo.png';

class NotSupported extends Component {
  render() {    
    return (
      <>
        <LoginHeading>
          <Logo src={logo} alt="img" />
        </LoginHeading>
        <div style={{ marginTop: '20px', textAlign: 'center'}}>
          <H4>
            Internet explorer is not supported, please use Google Chrome
          </H4>
        </div>
      </>
    );
  }
}

export default NotSupported;
