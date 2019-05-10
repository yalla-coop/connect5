import React, { Component } from "react";
import axios from "axios";
import setAuthToken from "../../Utils/setAuthToken";

import {
  Heading, Container, Form, Input, Error,
} from "./PageElementsAuth";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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
    const { email, password } = this.state;
    e.preventDefault();
    const trainer = {
      email,
      password,
    };
    this.loginTrainer(trainer);
  }

  loginTrainer = (trainerData) => {
    axios
      .post("/login", trainerData)
      .then(async (res) => {
        // save token to local storage
        const { token } = res.data;

        // set token to local storage (only stores strings)
        await localStorage.setItem("jwtToken", token);
        // set token to auth header
        await setAuthToken(token);
      })
      .then(() => { window.location.href = "/trainer/dashboard"; })
      .catch(err => this.setState({
        errors: err.response.data,
      }));
  };

  render() {
    const { errors, email, password } = this.state;
    return (
      <Container>
        <Heading>Trainer Login</Heading>
        <Form noValidate onSubmit={this.onSubmit}>
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
          <Input type="submit" submit />
        </Form>
      </Container>
    );
  }
}

export default Login;
