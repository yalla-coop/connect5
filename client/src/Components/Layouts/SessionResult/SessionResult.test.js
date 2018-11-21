import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter, Route } from "react-router-dom";

import SessionResults from "./index";

test("snapshot for 'SessionResults' layout", () => {
  const context = {};

  const component = renderer.create(
    <BrowserRouter context={context}>
      <Route path="/session/details/:sessionId/:sessionType" exact component={SessionResults} />
    </BrowserRouter>,
  );
  expect(component).toMatchSnapshot();
});
