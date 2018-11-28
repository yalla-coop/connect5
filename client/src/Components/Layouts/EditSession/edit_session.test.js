import React from "react";
import renderer from "react-test-renderer";
import { StaticRouter } from "react-router-dom";

import EditSession from "./index";

test("EditSession matches snapshot", () => {
  const context = {};
  const object = {
    date: "2018-11-01",
    type: 1,
    attendees: 10,
  };
  const component = renderer.create(
    <StaticRouter context={context}>
      <EditSession sessionDetails={object} />
    </StaticRouter>,
  );
  expect(component).toMatchSnapshot();
});
