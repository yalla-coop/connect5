import React from "react";

import {
  PageNotFoundWrapper,
  NumbersWrapper,
  Image,
  ZeroWrapper,
  ZeroImage,
  NailImg,
  WallImage,
  MsgWrapper,
  MsgTitle,
  MsgDescription,
  Button,
} from "./StyledComponets";

import Zero from "../../../assets/zero.png";
import Four from "../../../assets/four.png";
import Nail from "../../../assets/nail.png";
import Wall from "../../../assets/wall.png";

export default () => (
  <PageNotFoundWrapper>
    <NumbersWrapper>
      <Image src={Four} />
      <ZeroWrapper>
        <ZeroImage src={Zero} />
        <NailImg src={Nail} />
      </ZeroWrapper>
      <Image src={Four} />
    </NumbersWrapper>
    <WallImage src={Wall} />
    <MsgWrapper>
      <MsgTitle>
        Page Not Found!
      </MsgTitle>
      <MsgDescription>
        The page you are looking for was moved, removed, renamed or might never existed.
      </MsgDescription>
      <Button href="/">Go Home</Button>
    </MsgWrapper>
  </PageNotFoundWrapper>
);
