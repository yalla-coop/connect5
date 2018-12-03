import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";

import Navbar from "../Navbar";

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  navbar,
  ...rest
}) => (
  <Fragment>
    <Route
      {...rest}
      render={props => (isAuthenticated ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect to="/trainer/login" />
      ))}
    />
    {navbar && <Navbar />}
  </Fragment>
);

export default PrivateRoute;
