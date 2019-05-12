import { createStore, applyMiddleware, compose } from "redux";

// redux-thunk is a middleware that lets you dispatch async actions
import thunk from "redux-thunk";

// redux-logger is a middleware that lets you log every state change
import logger from "redux-logger";
import rootReducer from "./reducers";

const initialState = {};

const middleware = applyMiddleware(thunk, logger);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(...middleware),
);

export default store;
