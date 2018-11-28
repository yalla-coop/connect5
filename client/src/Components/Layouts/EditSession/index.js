
import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import axios from "axios";
import swal from "sweetalert";
import PropTypes from "prop-types";
import options from "./options";
import {
  Button,
  Form,
  Container,
  Input,
  SelectComponent,
  Date,
  Heading,
} from "./styledComponents";


class EditSession extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  state = {
    startDate: null,
    sessionType: null,
    attendeesNumber: "",
  }

  componentDidMount() {
    const { sessionDetails } = this.props;
    const { date, type, attendees } = sessionDetails;

    this.setState({ startDate: date, sessionType: type, attendeesNumber: attendees });
  }


  handleDate = (date) => {
    this.setState({ startDate: date });
  }

  handleAttendees = (e) => {
    this.setState({ attendeesNumber: e.target.value });
  }

  handleSession = (sessionType) => {
    this.setState({ sessionType });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { sessionDetails } = this.props;
    const { _id } = sessionDetails;
    const { startDate, attendeesNumber, sessionType } = this.state;


    axios.post(`/edit-session/${_id}`,
      {
        sessionType: sessionType.value,
        startDate: moment(startDate),
        attendeesNumber: parseInt(attendeesNumber || 0),
      })

      .then(
        swal("Done!", "The session has been edited successfully!")
          .then(() => this.context.router.history.push("/view-sessions")),
      )

      .catch(err => swal({
        icon: "error",
        title: err.response.data.message,
      }));
  }


  render() {
    const { startDate, attendeesNumber, sessionType } = this.state;
    const {
      handleDate, handleAttendees, handleSession, handleSubmit,
    } = this;

    return (
      <Container>

        <Heading>
          Edit Session
        </Heading>

        <Form onSubmit={handleSubmit}>


          <Date
            selected={moment(startDate)}
            placeholderText={startDate}
            onChange={handleDate}
            name="startDate"
            dateFormat="YYYY-MM-DD"
          />


          <Input
            type="number"
            placeholder={parseInt(attendeesNumber || 0)}
            onChange={handleAttendees}
            value={parseInt(attendeesNumber || 0)}
            name="attendeesNumber"
          />

          <SelectComponent
            placeholder={options.label}
            onChange={handleSession}
            options={options}
            value={sessionType}
          />

          <Button type="submit">Submit</Button>

        </Form>

      </Container>
    );
  }
}

export default EditSession;
