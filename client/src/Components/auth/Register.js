import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password2: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newTrainer = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      // password2: this.state.password2,
    };
    axios.post('http://localhost:9000/trainer/register', newTrainer);
  }

  render() {
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
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={this.state.lastName}
            onChange={this.onChange}
          />
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="password"
            value={this.state.password2}
            onChange={this.onChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default Register;
