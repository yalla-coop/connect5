import React from 'react';
import { Alert } from 'antd';

const { detect } = require('detect-browser');

const browser = detect();

export default () => {
  if (browser.name === 'ie') {
    return (
      <div style={{ padding: '1rem' }}>
        <Alert
          message="Browser not fully supported"
          description="Because you are using Internet Explorer browser some of the app functionality may not work as expected, we recommend using Chrome instead"
          type="warning"
          showIcon
        />
      </div>
    );
  }
  return null;
};
