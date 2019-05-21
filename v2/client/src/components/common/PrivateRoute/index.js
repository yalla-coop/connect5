import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import SpinWrapper from '../Spin';
import history from '../../../history';

// import "history" from "./../../"
import authorization from '../../../helpers/authorization';

const PrivateRoute = ({
  loaded,
  Component,
  path,
  exact,
  isAuthenticated,
  allowedRoles,
  role,
  ...rest
}) => {
  const authorized = authorization(role, allowedRoles);

  if (loaded) {
    return (
      <Route
        path={path}
        {...rest}
        render={LinkProps =>
          // eslint-disable-next-line no-nested-ternary
          isAuthenticated ? (
            authorized ? (
              <Component {...LinkProps} {...rest} />
            ) : (
              history.goBack() && null
            )
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
  }

  return <SpinWrapper />;
};

export default PrivateRoute;
