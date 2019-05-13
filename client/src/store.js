import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import thunk from "redux-thunk";
import logger from "redux-logger";

import rootReducer from "./reducers";

const initialState = {};
const middleware = [thunk];

if (process.env.NODE_ENV === "production") {
  middleware.push(logger);
}

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
