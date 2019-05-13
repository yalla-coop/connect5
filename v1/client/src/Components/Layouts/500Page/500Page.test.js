import React from "react";
import renderer from "react-test-renderer";
import ServerError from "./index";

test("500Page test", () => {
  const component = renderer.create(
    <ServerError />,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
