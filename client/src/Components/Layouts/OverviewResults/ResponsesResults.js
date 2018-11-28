import React from "react";
import PropTypes from "prop-types";

import { ResponsesResults as Container } from "./StyledComponents";
import Circle from "./Circle";

import getAttendeesNumber from "../../../Utils/get_aggregate_number";

const ResponsesResults = ({ responses }) => (
  <Container>
    <Circle title="pre-survey" number={getAttendeesNumber(responses, 0)} />
    <Circle title="Session 1" number={getAttendeesNumber(responses, 1)} />
    <Circle title="Session 2 " number={getAttendeesNumber(responses, 2)} />
    <Circle title="Session 3" number={getAttendeesNumber(responses, 3)} />
  </Container>
);

export default ResponsesResults;

ResponsesResults.propTypes = {
  responses: PropTypes.arrayOf(PropTypes.number).isRequired,
};
