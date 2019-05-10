import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import PropTypes from "prop-types";
import setAuthToken from "../../../Utils/setAuthToken";

import {
  Main,
  Container,
  Header,
  Heading,
  TableHeading,
  TableRowHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Icon,
  Button,
  H1,
} from "./styledComponents";

class ViewSessions extends Component {
  state = {
    sessions: [],
  };

  static contextTypes = {
    router: PropTypes.object,
  };

  componentDidMount() {
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
      axios
        .get("/view-sessions")
        .then((res) => {
          this.setState({ sessions: res.data });
        })
        .catch(() => {
          const { router } = this.context;
          router.history.push("/server-error");
        });
    }
  }

  handleClick = (session) => {
    const { router } = this.context;
    const { getCurrentSession } = this.props;
    getCurrentSession(session);
    router.history.push("/session-details");
  };

  render() {
    const { sessions } = this.state;
    return (
      <Main>
        <Header>
          <Heading>
            <H1>Sessions</H1>
          </Heading>
        </Header>
        <Container>
          <TableHeading>
            <TableRowHeader>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Details</TableHead>
            </TableRowHeader>
          </TableHeading>

          <TableBody>
            {sessions.map(session => (
              <TableRow key={session._id}>
                <TableCell>{moment(session.date).format("DD/MM/YYYY")}</TableCell>
                <TableCell>{session.type}</TableCell>
                <TableCell>
                  <Button onClick={() => this.handleClick(session)}>
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
