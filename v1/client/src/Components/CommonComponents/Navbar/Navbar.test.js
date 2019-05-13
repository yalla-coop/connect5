import React from "react";
import renderer from "react-test-renderer";
import { StaticRouter } from "react-router-dom";

import Navbar from "./index";

test("Navbar matches snapshot", () => {
  const context = {};
  const component = renderer.create(
    <StaticRouter context={context}>
      <Navbar />
    </StaticRouter>,
  );
  expect(component).toMatchSnapshot();
});
