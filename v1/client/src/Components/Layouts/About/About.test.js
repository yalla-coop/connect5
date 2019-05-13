import React from "react";
import renderer from "react-test-renderer";
import { StaticRouter } from "react-router-dom";

import About from "./index";

test("About matches snapshot", () => {
  const context = {};
  const component = renderer.create(
    <StaticRouter context={context}>
      <About />
    </StaticRouter>,
  );
  expect(component).toMatchSnapshot();
});
