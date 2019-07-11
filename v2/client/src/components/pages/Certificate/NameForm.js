import React, { Component } from 'react';
import { Input, Button } from 'antd';
import * as Yup from 'yup';

import { Wrapper, Content } from './Certificate.style';

export default class NameForm extends Component {
  state = {
    name: '',
    email: '',
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
    // validate the email and name
    if (sendEmail) {
      getNameEmail(name, email);
    } else {
      getNameEmail(name);
    }
    history.push(`/certificate/${match.params.sessionId}/claim`);
  };

  render() {
    const { sendEmail } = this.props;
    return (
      <Wrapper>
        <form onSubmit={this.handleSubmit}>
          <Content>
            <Input
              name="name"
              placeholder="Enter your name"
              onChange={this.handleChange}
            />
            <br />
            <br />
            {sendEmail && (
              <Input
                name="email"
                placeholder="Enter your email"
                onChange={this.handleChange}
              />
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
