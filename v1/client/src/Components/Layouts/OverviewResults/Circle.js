import React from "react";

import {
  CircleWrapper, Circle as CircleElement, CircleNumber, CircleTitle,
} from "./StyledComponents";

const Circle = ({ title, number }) => (
  <CircleWrapper>
    <CircleElement>
      <CircleNumber>
        {number}
      </CircleNumber>
    </CircleElement>
    <CircleTitle>
      {title}
    </CircleTitle>

  </CircleWrapper>
);

export default Circle;
