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
  viewLevel,
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
                {navbar && <Navbar viewLevel={viewLevel} role={role} />}
              </>
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



const mapStateToProps = state => ({
  viewLevel: state.viewLevel.viewLevel,
});

export default connect(
  mapStateToProps,
)(PrivateRoute);