import React from "react";
import renderer from "react-test-renderer";
import { StaticRouter } from "react-router-dom";
import axios from "axios";
import { render, fireEvent, cleanup } from "react-testing-library";

import EditSession from "./index";
const moment = require("moment");

afterEach(cleanup);

test("EditSession matches snapshot", () => {
  const context = {};
  const object = {
    _id: 1234,
    date: "2018-11-01",
    type: {
      label: "Session 0",
      value: 0,
    },
    attendees: 10,
  };
  const component = renderer.create(
    <StaticRouter context={context}>
      <EditSession sessionDetails={object} />
    </StaticRouter>,
  );
  expect(component).toMatchSnapshot();
});

test("Edit session :: user can change number of attendees and submit", () => {
  const context = {};
  const object = {
    _id: 1234,
    date: "1970-01-01",
    type: 1,
    attendees: 10,
  };
  const { getByPlaceholderText, getByText } = render(
    <StaticRouter context={context}>
      <EditSession sessionDetails={object} />
    </StaticRouter>,
  );
  const input = getByPlaceholderText("10");
  fireEvent.change(input, { target: { value: 100 } });
  const submit = getByText("Submit");
  fireEvent.click(submit);
  const calledUrl = axios.post.mock.calls[0][0];
  expect(calledUrl).toBe("/edit-session/1234");
  const calledParams = axios.post.mock.calls[0][1];
  expect(calledParams.attendeesNumber).toBe(100);
  axios.post.mockClear();
});

test("Edit session :: user can change date and submit", () => {
  const context = {};
  const object = {
    _id: 1234,
    date: "2000-01-01",
    type: 1,
    attendees: 10,
  };
  const { getByText, container } = render(
    <StaticRouter context={context}>
      <EditSession sessionDetails={object} />
    </StaticRouter>,
  );
  const date = container.querySelector('input[name="startDate"]');
  fireEvent.change(date, { target: { value: "2011-10-10" } });
  const submit = getByText("Submit");
  fireEvent.click(submit);
  const calledUrl = axios.post.mock.calls[0][0];
  expect(calledUrl).toBe("/edit-session/1234");
  const calledParams = axios.post.mock.calls[0][1];
  expect(calledParams.startDate).toBe("2011-10-10");
  axios.post.mockClear();
});
