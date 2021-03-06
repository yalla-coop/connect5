import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';

import 'react-app-polyfill/ie11';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import store from './store';

import 'antd/lib/icon/style/index.css';
import 'antd/lib/button/style/index.css';
import 'antd/lib/collapse/style/index.css';
import 'antd/lib/table/style/index.css';
import 'antd/lib/date-picker/style/index.css';
import 'antd/lib/input/style/index.css';
import 'antd/lib/select/style/index.css';
import 'antd/lib/form/style/index.css';
import 'antd/lib/modal/style/index.css';
import 'antd/lib/checkbox/style/index.css';
import 'antd/lib/alert/style/index.css';
import 'antd/lib/spin/style/index.css';
import 'antd/lib/divider/style/index.css';
import './index.css';
import 'antd/dist/antd.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
