import React, { Component } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";


const Contianer = styled.div`

`;
const Heading = styled.h1`

`;

const Form = styled.form`
  background:none;
  color: red
`;

const Input = styled.input`
  
`;


class CreateSession extends Component {
  state = {
    startDate: moment(),
  };

  handleChange=(date) => {
    this.setState({
      startDate: date,
    });
  }

  render() {
    const { startDate } = this.state;

    return (
      <Contianer>

        <Heading>
        Create New Session
        </Heading>
        <DatePicker
          selected={startDate}
          onChange={this.handleChange}
        />
        <Form>
          <Input type="number" />
          <Input type="number" />
        </Form>
      </Contianer>
    );
  }
}
export default CreateSession;
