import React from "react";
import renderer from "react-test-renderer";
import { StaticRouter } from "react-router-dom";

import Register from "./Register";

test("Register matches snapshot", () => {
  const context = {};
  const component = renderer.create(
    <StaticRouter context={context}>
      <Register />
    </StaticRouter>,
  );
  expect(component).toMatchSnapshot();
});
