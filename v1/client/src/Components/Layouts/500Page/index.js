import React from "react";

import {
  ServerErrorWrapper,
  NumbersWrapper,
  Numbers,
  WallImage,
  MsgWrapper,
  MsgTitle,
  MsgDescription,
  Button,
} from "./StyledComponets";
import Wall from "../../../assets/wall.png";


export default () => (
  <ServerErrorWrapper>
    <NumbersWrapper>
      <Numbers>500</Numbers>
    </NumbersWrapper>
    <WallImage src={Wall} />
    <MsgWrapper>
      <MsgTitle>
        Server Error!
      </MsgTitle>
      <MsgDescription>
        Oops! Sorry, an error has occured. Internal Server Error!
      </MsgDescription>
      <Button href="/">Go Home</Button>
    </MsgWrapper>
  </ServerErrorWrapper>
);
