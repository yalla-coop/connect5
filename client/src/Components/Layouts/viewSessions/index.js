import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import PropTypes from "prop-types";

import {
  Main,
  Container,
  Header,
  Heading,
  Borderbottom,
  TableHeading,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Icon,
  Button,
} from "./styledComponents";

class ViewSessions extends Component {
  state = {
    sessions: [],
  };

  static contextTypes = {
    router: PropTypes.object,
  };

  componentDidMount() {
    axios
      .get("/view-sessions")
      .then((res) => {
        this.setState({ sessions: res.data });
      })
      .catch(err => console.log(err));
  }

  handleClick = () => {
    const { sessions } = this.state;
    const { handleSessions } = this.props;
    handleSessions(sessions);
    this.context.router.history.push("/session-details");
  };

  render() {
    const { sessions } = this.state;
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
            {sessions.map(session => (
              <TableRow key={Date.now()}>
                <TableCell>
                  {moment(session.date).format("YYYY/MM/DD")}
                </TableCell>
                <TableCell>{session.type}</TableCell>
                <TableCell>
                  <Button onClick={this.handleClick}>
                    <Icon className="fas fa-angle-right" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Container>
      </Main>
    );
  }
}

export default ViewSessions;
