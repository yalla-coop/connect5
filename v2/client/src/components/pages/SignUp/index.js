import React, { Component } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { connect } from 'react-redux';
import { fetchLocalLeads } from '../../../actions/users';
import { signUpTrainer, checkUniqeEmail } from '../../../actions/authAction';

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

  componentDidMount() {
    const { isAuthenticated, history } = this.props;
    if (isAuthenticated) {
      return history.push('/dashboard');
    }
    const { fetchLocalLeads: fetchLocalLeadsActionCreator } = this.props;
    return fetchLocalLeadsActionCreator();
  }

  componentDidUpdate(prevProps) {
    const { isEmailUnique, form } = this.props;
    const { isEmailUnique: oldIsEmailUnique } = prevProps;

    if (oldIsEmailUnique !== isEmailUnique) {
      form.validateFields(['email'], { force: true });
    }
  }

  handleConfirmBlur = e => {
    const { confirmDirty } = this.state;
    const { value } = e.target;
    this.setState({ confirmDirty: confirmDirty || !!value });
  };

  handleEmailBlur = e => {
    const { checkUniqeEmail: checkUniqeEmailActionCreator } = this.props;
    const { value } = e.target;
    if (value) {
      checkUniqeEmailActionCreator(value);
    }
  };

  handleSubmit = e => {
    const { form, signUpTrainer: signUpTrainerActionCreator } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        signUpTrainerActionCreator(values);
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

  validateUniqueEmail = (rule, value, callback) => {
    const { isEmailUnique, form } = this.props;

    if (isEmailUnique === null) {
      callback();
    } else if (!isEmailUnique) {
      callback(true);
    } else {
      form.validateFields(['email'], { force: true });
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
      localLeads,
      isAuthenticated,
      history,
    } = this.props;

    if (isAuthenticated) {
      history.push('/dashboard');
      return null;
    }

    return (
      <Wrapper>
        <Title>Create a new Connect 5 Trainer Account</Title>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item hasFeedback>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: 'Please input your name!',
                },
                {
                  min: 3,
                  message: 'Please input valid name',
                },
              ],
            })(<Input placeholder="Name" />)}
          </Form.Item>

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
                {
                  message: 'Sorry, this email is not available',
                  validator: this.validateUniqueEmail,
                },
              ],
            })(<Input placeholder="Email" onBlur={this.handleEmailBlur} />)}
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
                {localLeads &&
                  localLeads.map(({ name, _id }) => (
                    <Option value={_id}>{name}</Option>
                  ))}
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

          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    localLeads: state.fetchedData.localLeadsList,
    isAuthenticated: state.auth.isAuthenticated,
    isEmailUnique: state.auth.isEmailUnique,
  };
};

// see http://react-component.github.io/form/examples/redux.html
// to understand the syntax
export default connect(
  mapStateToProps,
  {
    fetchLocalLeads,
    signUpTrainer,
    checkUniqeEmail,
  }
)(Form.create({ name: 'SignUp' })(SignUp));
