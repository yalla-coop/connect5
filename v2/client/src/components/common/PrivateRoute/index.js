import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import SpinWrapper from '../Spin';

const PrivateRoute = ({
  loaded,
  Component,
  path,
  exact,
  isAuthenticated,
  ...rest
}) => {
  return loaded ? (
    <Route
      path={path}
      {...rest}
      render={LinkProps =>
        isAuthenticated ? (
          <>
            <Component {...LinkProps} {...rest} />
          </>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  ) : (
    <SpinWrapper />
  );
};

export default PrivateRoute;
