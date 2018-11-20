import React from "react";
import renderer from "react-test-renderer";
import { StaticRouter } from "react-router-dom";

import OverallResults from "./index";

test("snapshot for 'OverallResults' layout", () => {
  const context = {};
  const match = {
    params: {
      sessionId: "sessionId",
      sessionType: "sessionType",
    },
  };

  const component = renderer.create(
    <StaticRouter context={context}>
      <OverallResults match={match} />
    </StaticRouter>,
  );
  expect(component).toMatchSnapshot();
});
