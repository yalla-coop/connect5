import React, { Component } from 'react';
import { Form, Input, Button, Select } from 'antd';

import {
  Wrapper,
  Title,
  // Form
} from './SignUp.style';

const { Option } = Select;

const regions = [
  'North East',
  'North West',
  'Yorkshire and the Humber',
  'East Midlands',
  'West Midlands',
  'East of England',
  'London',
  'South East',
  'South West',
];
class SignUp extends Component {
  state = {
    confirmDirty: false,
  };

  handleSubmit = e => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { confirmDirty } = this.state;
    const { form } = this.props;
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Wrapper>
        <Title>Create a new Connect 5 Trainer Account</Title>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item hasFeedback>
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ],
            })(<Input placeholder="Email" />)}
          </Form.Item>

          <Form.Item hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  pattern: /(?=.*[a-z])/,
                  message:
                    'Password must contain at least 1 lowercase alphabetical character',
                },
                {
                  pattern: /(?=.*[A-Z])/,
                  message:
                    'Password must contain at least 1 uppercase alphabetical character',
                },
                {
                  pattern: /(?=.*[0-9])/,
                  message: 'Password must contain at least 1 numeric character',
                },
                {
                  pattern: /(?=.{8,})/,
                  message: 'Password must be eight characters or longer',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
              validateFirst: true,
            })(<Input.Password placeholder="Password" />)}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(
              <Input.Password
                placeholder="Confirm Password"
                onBlur={this.handleConfirmBlur}
              />
            )}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator('localLead', {
              rules: [
                {
                  required: true,
                  message: 'Please select your local lead',
                },
              ],
            })(
              <Select placeholder="Local Lead">
                {/* to be fetched from back-end */}
              </Select>
            )}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator('region', {
              rules: [
                {
                  required: true,
                  message: 'Please select your region',
                },
              ],
            })(
              <Select placeholder="Region">
                {regions.map(region => (
                  <Option value={region}>{region}</Option>
                ))}
              </Select>
            )}
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form>
      </Wrapper>
    );
  }
}

export default Form.create({ name: 'SignUp' })(SignUp);
