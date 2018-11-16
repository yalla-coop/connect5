import React, { Component } from "react";
import axios from "axios";
import moment from "moment";

import {
  Button,
  Form,
  Contianer,
  Input,
  SelectComponent,
  Date,
  Heading,
  Error,
} from "./FormElements";
import options from "./options";

import "react-datepicker/dist/react-datepicker.css";

class CreateSession extends Component {
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
    console.log(isError, "iserrere");

    return isError;
  }

  fetch = () => {
    const { startDate, attendantsNumber, session } = this.state;
    console.log("don");

    axios.post("/session",
      {
        session: session.value,
        startDate: moment(startDate).format("YYYY,MM,DD"),
        attendantsNumber,
      }).then(res => console.log(res));
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
      <Contianer>

        <Heading>
        Create New Session
        </Heading>

        <Form onSubmit={e => this.handleSubmit(e)}>

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

      </Contianer>
    );
  }
}
export default CreateSession;
