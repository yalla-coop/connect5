import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter, Route } from "react-router-dom";

import OverviewResults from "./index";

test("snapshot for 'OverviewResults' layout", () => {
  const context = {};

  const component = renderer.create(
    <BrowserRouter context={context}>
      <Route path="/" exact component={OverviewResults} />
    </BrowserRouter>,
  );
  expect(component).toMatchSnapshot();
});
