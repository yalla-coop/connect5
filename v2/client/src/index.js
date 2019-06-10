import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import store from './store';

import 'antd/lib/icon/style/index.css';
import 'antd/lib/button/style/index.css';
import 'antd/lib/collapse/style/index.css';
import 'antd/lib/table/style/index.css';
<<<<<<< HEAD
import 'antd/lib/input/style/index.css';
=======
>>>>>>> dc171db9bee4648255d8a915147f1c1974190648
import 'antd/lib/date-picker/style/index.css';
import 'antd/lib/input/style/index.css';
import 'antd/lib/select/style/index.css';
import 'antd/lib/form/style/index.css';
import 'antd/lib/modal/style/index.css';
<<<<<<< HEAD
=======
import 'antd/lib/checkbox/style/index.css';
>>>>>>> dc171db9bee4648255d8a915147f1c1974190648

import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
