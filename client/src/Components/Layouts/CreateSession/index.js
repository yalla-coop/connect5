import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from "moment"
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

  handleChange=(date)=> {
    this.setState({
      startDate: date
    });
  }

  render() {
    return (
      <Contianer>
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
        />
        <Heading>
        Create New Session
        </Heading>
        <Form>
          <Input type="input" />
          <Input type="input" />

        </Form>
      </Contianer>
    );
  }
}
export default CreateSession;
