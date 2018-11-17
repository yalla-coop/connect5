import React from "react";
import renderer from "react-test-renderer";
import { StaticRouter } from "react-router-dom";

import SessionDetails from "./index";

test("Header matches snapshot", () => {
  const context = {};
  const component = renderer.create(
    <StaticRouter context={context}>
      <SessionDetails />
    </StaticRouter>,
  );
  expect(component).toMatchSnapshot();
});
