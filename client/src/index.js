import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./Components/App";
import store from "./store";

import "./index.css";
import "./normalize.css";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
);
