import React, { Component } from "react";
import axios from "axios";

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
    e.preventDefault();
    const newTrainer = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };
    this.registerUser(newTrainer);
  }

  registerUser = (trainerData) => {
    axios
      .post("/register", trainerData)
      .then(res => this.props.history.push("/login")) // redirect after reguster success
      .catch(err => this.setState({
        errors: err.response.data,
      }));
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <h1>Create your Account</h1>
        <form noValidate onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={this.state.firstName}
            onChange={this.onChange}
          />
          {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={this.state.lastName}
            onChange={this.onChange}
          />
          {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
          {" "}
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={this.state.password2}
            onChange={this.onChange}
          />
          {errors.password2 && <div className="invalid-feedback">{errors.password2}</div>}
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default Register;
