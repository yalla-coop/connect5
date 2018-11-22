import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter, Route } from "react-router-dom";

import IndividualResults from "./index";

test("snapshot for 'IndividualResults' layout", () => {
  const context = {};

  const component = renderer.create(
    <BrowserRouter context={context}>
      <Route path="/" exact component={IndividualResults} />
    </BrowserRouter>,
  );
  expect(component).toMatchSnapshot();
});
