import React from 'react';
import Home from './Home';
import renderer from 'react-test-renderer';

test('Basic test for Home layout', () => {
  const component = renderer.create(
    <Home />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});