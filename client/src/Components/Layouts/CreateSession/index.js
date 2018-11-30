import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import swal from "sweetalert";

import ReactRouterPropTypes from "react-router-prop-types";

import {
  Button,
  Form,
  Container,
  Input,
  SelectComponent,
  Date,
  Heading,
  Error,
} from "./FormElements";
import options from "./options";
import setAuthToken from "../../../Utils/setAuthToken";

import "react-datepicker/dist/react-datepicker.css";

class CreateSession extends Component {
  static propTypes = {
    history: ReactRouterPropTypes.history,
  }

  static defaultProps = {
    history: null,
  };

  state = {
    session: "",
    startDate: null,
    attendantsNumber: "",
    err: false,
  };

  handleDateChange = (date) => {
    this.setState({
      startDate: date,
    });
  }

  handleInputChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  }

  handleSelectChange = (session) => {
    this.setState({
      session,
    });
  }

  checkError = () => {
    const { startDate, attendantsNumber, session } = this.state;
    const isError = !(!!startDate && !!attendantsNumber && !!session);

    this.setState({
      err: isError,
    });

    return isError;
  }

  fetch = () => {
    const { startDate, attendantsNumber, session } = this.state;
    const { history } = this.props;

    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);

      axios.post("/session",
        {
          sessionType: session.value,
          startDate: moment(startDate).format("YYYY,MM,DD"),
          attendantsNumber,
        })

        .then(
          swal("Done!", "The session has been added successfully!", "success")
            .then(() => history.push("/tainer/sessions")),
        )

        .catch(err => swal({
          icon: "error",
          title: err.response.data.message,
        }));
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    return !this.checkError() && this.fetch();
  }

  render() {
    const {
      startDate, attendantsNumber, session, err,
    } = this.state;

    return (
      <Container>

        <Heading>
          Create New Session
        </Heading>

        <Form onSubmit={this.handleSubmit}>

          <Date
            selected={startDate}
            placeholderText="Click to select a date"
            onChange={this.handleDateChange}
            name="startDate"
            dateFormat="YYYY-MM-DD"
          />

          <Input
            type="number"
            placeholder="Number of session attendants"
            value={attendantsNumber}
            onChange={this.handleInputChange}
            name="attendantsNumber"
          />

          <SelectComponent
            options={options}
            onChange={this.handleSelectChange}
            placeholder="Click to selesct session No."
            selected={session}
          />
          { err && <Error>All inputs are required</Error> }
          <Button type="submit">Submit</Button>

        </Form>

      </Container>
    );
  }
}
export default CreateSession;
