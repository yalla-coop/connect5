import React, { Component } from 'react';
import { Input, Button } from 'antd';
import * as Yup from 'yup';

import { Wrapper, Content, ErrorMessage } from './Certificate.style';

const name = Yup.string().required();

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
    const { sendEmail } = this.props;
    const options = {
      abortEarly: false,
      stripUnknown: true,
    };

    // try {
    if (sendEmail) {
      return nameEmailSchema.validate(this.state, options);
    }
    return nameSchema.validate(this.state, options);
    // } catch (err) {
    // console.log('err', err);
    // }
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { sendEmail, getNameEmail, history, match } = this.props;
    const { name, email } = this.state;

    this.validate()
      .then(res => {
        console.log('ree', res);
        history.push(`/certificate/${match.params.sessionId}/claim`);
      })
      .catch(error => {
        const errors = {};
        error.inner.forEach(err => {
          errors[err.path] = err.message;
        });

        console.log('errors', errors);
        this.setState({
          errors,
        });
      });
  };

  render() {
    const { sendEmail } = this.props;
    const { errors } = this.state;

    return (
      <Wrapper>
        <form onSubmit={this.handleSubmit}>
          <Content>
            <Input
              name="name"
              placeholder="Enter your name"
              onChange={this.handleChange}
            />
            <ErrorMessage>{errors.name}</ErrorMessage>

            {sendEmail && (
              <>
                <br />
                <br />
                <Input
                  name="email"
                  placeholder="Enter your email"
                  onChange={this.handleChange}
                />
                <ErrorMessage>{errors.email}</ErrorMessage>
              </>
            )}
            <br />
            <br />
            <Button htmlType="submit" type="primary" size="large" block>
              Submit
            </Button>
          </Content>
        </form>
      </Wrapper>
    );
  }
}
