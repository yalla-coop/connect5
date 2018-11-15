import React, { Component } from "react";

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

  handleSubmit = (event) => {
    event.preventDefault();
    const { startDate, attendantsNumber, session } = this.state;
    if (!!startDate && !!attendantsNumber && !!session) {
      this.setState({
        err: false,
      });
    } else {
      this.setState({
        err: true,
      });
    }
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
