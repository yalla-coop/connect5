import React, { Component } from "react";
import axios from "axios";
import {
  Heading, Container, Form, Input, Error,
} from "./PageElementsAuth";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // sumbmit to send object to backend to be stored in DB
  onSubmit(e) {
    const {
      firstName, lastName, email, password, password2,
    } = this.state;
    e.preventDefault();
    const newTrainer = {
      firstName,
      lastName,
      email,
      password,
      password2,
    };
    this.registerUser(newTrainer);
  }

  registerUser = (trainerData) => {
    const { history } = this.props;
    axios
      .post("/register", trainerData)
      .then(() => history.push("/trainer/login")) // redirect after reguster success
      .catch(err => this.setState({
        errors: err.response.data,
      }));
  };

  render() {
    const {
      errors, firstName, lastName, email, password, password2,
    } = this.state;
    return (
      <Container>
        <Heading>Create Your Account</Heading>
        <Form noValidate onSubmit={this.onSubmit}>
          <Input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={firstName}
            onChange={this.onChange}
          />
          {errors.firstName && <Error className="invalid-feedback">{errors.firstName}</Error>}
          <Input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={lastName}
            onChange={this.onChange}
          />
          {errors.lastName && <Error className="invalid-feedback">{errors.lastName}</Error>}
          {" "}
          <Input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={this.onChange}
          />
          {errors.email && <Error className="invalid-feedback">{errors.email}</Error>}
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={this.onChange}
          />
          {errors.password && <Error className="invalid-feedback">{errors.password}</Error>}
          <Input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={this.onChange}
          />
          {errors.password2 && <Error className="invalid-feedback">{errors.password2}</Error>}
          <Input type="submit" submit />
        </Form>
      </Container>
    );
  }
}

export default Register;
