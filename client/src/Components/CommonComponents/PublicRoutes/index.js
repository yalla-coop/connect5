import React, { Fragment } from "react";
import { Route } from "react-router-dom";

import Header from "../Header";

const PublicRoutes = ({
  component: Component,
  header,
  ...rest
}) => {
  return (
    <Fragment>
      {header && <Header />}
      <Route
        {...rest}
        render={props => <Component {...props} />}
      />

    </Fragment>
  );
};

export default PublicRoutes;
