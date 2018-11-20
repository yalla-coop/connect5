import React from "react";
import renderer from "react-test-renderer";
import { StaticRouter } from "react-router-dom";

import SessionResults from "./index";

test("snapshot for 'SessionResults' layout", () => {
  const context = {};
  const match = {
    params: {
      sessionId: "sessionId",
      sessionType: "sessionType",
    },
  };

  const component = renderer.create(
    <StaticRouter context={context}>
      <SessionResults match={match} />
    </StaticRouter>,
  );
  expect(component).toMatchSnapshot();
});
