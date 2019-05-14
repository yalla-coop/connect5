import React from "react";
import renderer from "react-test-renderer";
import { StaticRouter } from "react-router-dom";

import Logout from "./index";

test("Logout matches snapshot", () => {
  const context = {};
  const component = renderer.create(
    <StaticRouter context={context}>
      <Logout />
    </StaticRouter>,
  );
  expect(component).toMatchSnapshot();
});
