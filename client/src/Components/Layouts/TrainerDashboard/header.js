import React from "react";
import { Header, UserName, Welcome } from "./styledComponents";

const DashboardHeader = ({ trainerFirstName }) => (
  <Header>
    <Welcome>
      Welcome back,
      <UserName>
        {trainerFirstName}
!
      </UserName>
    </Welcome>
  </Header>
);

export default DashboardHeader;
