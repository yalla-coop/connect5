import React, { Component } from 'react';
import { Input } from 'antd';
import * as Yup from 'yup';

import Button from '../../common/Button';

import {
  Wrapper,
  Content,
  ErrorMessage,
  InputDiv,
  LoginForm,
} from './Certificate.style';

const name = Yup.string()
  .min(3)
  .required();

const email = Yup.string()
  .email()
  .required();

const nameSchema = Yup.object({
  name,
});

const nameEmailSchema = Yup.object({
  name,
  email,
});

export default class NameForm extends Component {
  state = {
    name: '',
    email: '',
    errors: {
      name: '',
      email: '',
    },
  };

  validate = async () => {
    const { location } = this.props;
    const { sendEmail } = location.state;
    const options = {
      abortEarly: false,
      stripUnknown: true,
    };

    if (sendEmail) {
      return nameEmailSchema.validate(this.state, options);
    }
    return nameSchema.validate(this.state, options);
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { location, getNameEmail, history, match } = this.props;
    this.validate()
      .then(res => {
        getNameEmail(res.name, res.email, location.state.sendEmail);
        history.push(`/certificate/${match.params.sessionId}/claim`);
      })
      .catch(error => {
        const errors = {};
        error.inner.forEach(err => {
          errors[err.path] = err.message;
        });
        this.setState({
          errors,
        });
      });
  };

  render() {
    const { location } = this.props;
    const { sendEmail } = location && location.state && location.state;
    const { errors, name, email } = this.state;

    return (
      <Wrapper>
        <LoginForm onSubmit={this.handleSubmit}>
          <Content>
            <Input
              name="name"
              placeholder="Enter your name"
              onChange={this.handleChange}
              value={name}
            />
            <ErrorMessage>{errors.name}</ErrorMessage>

            {sendEmail && (
              <>
                <br />
                <Input
                  name="email"
                  placeholder="Enter your email"
                  onChange={this.handleChange}
                  value={email}
                />
                <ErrorMessage>{errors.email}</ErrorMessage>
              </>
            )}
            <br />
            {/* <Button htmlType="submit" type="primary" size="large" block>
              Submit
            </Button> */}

            <InputDiv>
              <Button
                type="primary"
                label="Submit"
                height="40px"
                width="100%"
              />
            </InputDiv>
          </Content>
        </LoginForm>
      </Wrapper>
    );
  }
}
