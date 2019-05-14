import React from "react";
import renderer from "react-test-renderer";
import PageNotFound from "./index";

test("404Page test", () => {
  const component = renderer.create(
    <PageNotFound />,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
