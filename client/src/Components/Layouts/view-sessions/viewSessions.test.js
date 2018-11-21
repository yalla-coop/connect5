import React from "react";
import renderer from "react-test-renderer";
import { StaticRouter } from "react-router-dom";

import ViewSessions from "./index";

test("Header matches snapshot", () => {
  const context = {};
  const component = renderer.create(
    <StaticRouter context={context}>
      <ViewSessions />
    </StaticRouter>,
  );
  expect(component).toMatchSnapshot();
});
