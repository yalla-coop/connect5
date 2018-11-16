import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Main, Container, Header, Heading, Borderbottom, TableHeading, TableRow, TableHead, TableBody, TableCell, Icon,
} from "./styledComponents";


class ViewSessions extends Component {
  render() {
    return (
      <Main>
        <Header>
          <Heading>
            <h1>Sessions</h1>
          </Heading>
          <Borderbottom />
        </Header>
        <Container>
          <TableHeading>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeading>

          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>2</TableCell>
              <TableCell><Link to="/"><Icon className="fas fa-angle-right" /></Link></TableCell>
            </TableRow>
          </TableBody>
        </Container>
      </Main>
    );
  }
}

export default ViewSessions;
