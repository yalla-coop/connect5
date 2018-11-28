import React from "react";
import renderer from "react-test-renderer";
import { StaticRouter } from "react-router-dom";

import LandingPage from "./index";

test("LandingPage matches snapshot", () => {
  const context = {};

  const component = renderer.create(
    <StaticRouter context={context}>
      <LandingPage />
    </StaticRouter>,
  );
  expect(component).toMatchSnapshot();
});
