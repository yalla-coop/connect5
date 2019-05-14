import React from "react";
import renderer from "react-test-renderer";
import CreateSession from "./index";

test("Create Section test", () => {
  const component = renderer.create(
    <CreateSession />,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
