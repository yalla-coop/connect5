import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import SpinWrapper from '../Spin';
import history from '../../../history';
import Navbar from '../Navbar';

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
  navbar,
  isMobile,
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
              <>
                <Component {...LinkProps} {...rest} role={role} />
                {isMobile && navbar && <Navbar role={role} />}
              </>
            ) : (
              history.push('/unauthorized') && null
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

const mapStateToProps = state => ({
  isMobile: state.checkBrowserWidth.isMobile,
});

export default connect(mapStateToProps)(PrivateRoute);
