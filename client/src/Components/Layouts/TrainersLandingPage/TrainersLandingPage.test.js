import React from "react";
import renderer from "react-test-renderer";
import { StaticRouter } from "react-router-dom";

import TrainersLandingPage from "./index";

test("Header matches snapshot", () => {
  const context = {};

  const component = renderer.create(
    <StaticRouter context={context}>
      <TrainersLandingPage />
    </StaticRouter>,
  );
  expect(component).toMatchSnapshot();
});
