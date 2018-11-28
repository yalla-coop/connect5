import React from "react";

import getAttendeesNumber from "../../../Utils/get_aggregate_number";
import { AttendanceResults as Container } from "./StyledComponents";
import Circle from "./Circle";


const AttendanceResults = ({ attendees }) => (
  <Container>
    <Circle title="Session 1" number={getAttendeesNumber(attendees, 1)} />
    <Circle title="Session 2 " number={getAttendeesNumber(attendees, 2)} />
    <Circle title="Session 3" number={getAttendeesNumber(attendees, 3)} />
  </Container>
);

export default AttendanceResults;
