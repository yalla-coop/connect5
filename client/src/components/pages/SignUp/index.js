import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Checkbox, Modal, Popover } from 'antd';

import { fetchLocalLeads } from '../../../actions/users';
import { signUpTrainer, checkUniqeEmail } from '../../../actions/authAction';

import { createGroupedLocalLeads } from '../../../helpers/createGroupedLocalLeads';

import Button from '../../common/Button';
import HumburgerMenu from '../../common/Menu';
import logo from '../../../assets/logo.png';
import {
  Wrapper,
  ContentWrapper,
  Form,
  Input,
  Password,
  Select,
  Item,
  Redirecting,
  StyledLink,
  LoginHeading,
  H4,
  Logo,
  AnotherLink,
} from './SignUp.style';

const { Option, OptGroup } = Select;

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
    givenPermission: true,
    role: 'trainer',
    checkLocalLead: false,
    officialLocalLead: false,
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

  onChangeCheckbox = e => {
    let role = '';
    const { officialLocalLead } = this.state;
    if (e.target.checked) {
      role = 'localLead';
    } else {
      role = 'trainer';
    }
    this.setState({
      role,
      checkLocalLead: e.target.checked,
      officialLocalLead: officialLocalLead && e.target.checked,
    });
  };

  onChangeCheckboxOfficialLocalLead = e => {
    this.setState({ officialLocalLead: e.target.checked });
  };

  handleSubmit = e => {
    console.log('-------------');
    const { role, givenPermission, officialLocalLead } = this.state;

    const { form, signUpTrainer: signUpTrainerActionCreator } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err && givenPermission) {
        signUpTrainerActionCreator({ role, officialLocalLead, ...values });
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
    const { isEmailUnique } = this.props;

    if (value && isEmailUnique === null) {
      callback();
    } else if (value && !isEmailUnique) {
      callback(true);
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

  onChangeCheckboxPermission = e => {
    const { role } = this.state;
    const { checked } = e.target;
    this.setState({ givenPermission: checked }, () => {
      if (!checked && role === 'trainer') {
        Modal.warning({
          content: (
            <div>
              <p>
                To make sure Connect 5 succeeds as a mental wellbeing training
                programme we depend on monitoring and feedback data related to
                course participants and trainers. If you do not agree to giving
                your local lead/ managing organisation permission to access
                individual feedback data please contact them to discuss this
                issue
              </p>
            </div>
          ),
        });
      }
    });
  };

  render() {
    const { role, givenPermission, checkLocalLead } = this.state;
    const {
      form: { getFieldDecorator },
      localLeads,
      isAuthenticated,
      history,
      isDeskTop,
      loading,
    } = this.props;

    const {
      onChangeCheckbox,
      onChangeCheckboxPermission,
      onChangeCheckboxOfficialLocalLead,
    } = this;

    if (isAuthenticated) {
      history.push('/dashboard');
      return null;
    }

    const content = (
      <div style={{ maxWidth: '250px', margin: '0 auto' }}>
        <h3 style={{ 'font-weight': '400', 'font-size': '1.2rem' }}>
          Are you a trainer, trainer manager or official local lead?
        </h3>
        <p>
          In case <strong>you are managing groups of trainers</strong> (e.g.
          organising their sessions) please select the option "I'm managing
          groups of trainers". If you are acting as{' '}
          <strong>an official Connect 5 local lead</strong>, please also check
          the follow up box "I'm an official Connect 5 Local Lead". If you're
          registering as a <strong>Connect 5 Trainer</strong> please don't check
          any of the boxes and select your official Connect 5 local lead from
          the dropdown below.
        </p>
      </div>
    );

    const groupedLocalLeads = createGroupedLocalLeads(localLeads);

    return (
      <>
        {isDeskTop && <HumburgerMenu dark="dark" />}
        <LoginHeading>
          <AnotherLink to="/">
            <Logo src={logo} alt="img" />
          </AnotherLink>
          <H4>Create a new account</H4>
        </LoginHeading>
        <Wrapper className="sign-up">
          <ContentWrapper>
            <p style={{ color: 'red', textAlign: 'center' }}>
              <strong>Important Notice:</strong> Only Connect 5 staff members
              (trainers, local leads etc.) are supposed to sign up.
              <br></br>
              <AnotherLink to="/participant-login">
                Course participants will be able to log in here!
              </AnotherLink>
            </p>

            <Form
              onSubmit={this.handleSubmit}
              className="login-form"
              style={{ padding: '20px 0' }}
            >
              <Item hasFeedback>
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
                })(<Input placeholder="Name" size="large" />)}
              </Item>

              <Item hasFeedback>
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
                      message: 'Already taken',
                      validator: this.validateUniqueEmail,
                    },
                  ],
                })(
                  <Input
                    placeholder="Email"
                    onBlur={this.handleEmailBlur}
                    size="large"
                  />
                )}
              </Item>

              <Item hasFeedback>
                {getFieldDecorator('organization')(
                  <Input placeholder="Your Organization" size="large" />
                )}
              </Item>

              <Item hasFeedback>
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
                      message:
                        'Password must contain at least 1 numeric character',
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
                })(<Password placeholder="Password" size="large" />)}
              </Item>
              <Item hasFeedback>
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
                  <Password
                    placeholder="Confirm Password"
                    onBlur={this.handleConfirmBlur}
                    size="large"
                  />
                )}
              </Item>

              <Popover content={content} style={{ marginRight: '2rem' }}>
                <button
                  type="button"
                  style={{ background: 'none', border: 'none' }}
                >
                  <i
                    className="fas fa-question-circle"
                    style={{ color: '#9FCE67' }}
                  />
                </button>
              </Popover>

              <Checkbox
                onChange={onChangeCheckbox}
                style={{
                  textAlign: 'left',
                  padding: '0 20px',
                  marginBottom: '24px',
                }}
              >
                <span style={{ fontSize: '.9rem' }}>
                  <strong>I'm managing groups of trainers</strong>
                </span>
              </Checkbox>

              {checkLocalLead && (
                <Checkbox
                  onChange={onChangeCheckboxOfficialLocalLead}
                  style={{
                    textAlign: 'left',
                    marginBottom: '24px',
                  }}
                >
                  <span style={{ fontSize: '.9rem' }}>
                    <strong>I{"'"}m an official Connect 5 Local Lead</strong>
                  </span>
                </Checkbox>
              )}

              {role !== 'localLead' && (
                <Item style={{ margin: '0 auto 20' }}>
                  {getFieldDecorator('localLead', {
                    rules: [
                      {
                        validator: (rule, value, callback) => {
                          if (!value && role === 'trainer') {
                            callback('Please select your local lead');
                          } else {
                            callback();
                          }
                        },
                      },
                    ],
                  })(
                    <Select
                      placeholder="Official Connect 5 Local Lead"
                      size="large"
                    >
                      {groupedLocalLeads &&
                        Object.keys(groupedLocalLeads).map(item => (
                          <OptGroup label={item}>
                            {groupedLocalLeads[item].map(_localLead => {
                              return (
                                <Option value={_localLead._id}>
                                  {_localLead.name}
                                </Option>
                              );
                            })}
                          </OptGroup>
                        ))}
                    </Select>
                  )}
                </Item>
              )}
              <Item style={{ margin: '0 auto 20' }}>
                {getFieldDecorator('region', {
                  rules: [
                    {
                      required: true,
                      message: 'Please select your region',
                    },
                  ],
                })(
                  <Select placeholder="Region" size="large">
                    {regions.map(region => (
                      <Option value={region} key={region}>
                        {region}
                      </Option>
                    ))}
                  </Select>
                )}
              </Item>

              {role === 'trainer' && (
                <Checkbox
                  onChange={onChangeCheckboxPermission}
                  style={{
                    textAlign: 'left',
                    padding: '0 20px',
                    marginBottom: '24px',
                    fontSize: '16px',
                  }}
                  defaultChecked
                  value={givenPermission}
                >
                  <span style={{ fontSize: '.9rem' }}>
                    By signing up I confirm that my local lead can access
                    individual profile data such as name, email and organisation
                    as well as session results collected via the app after each
                    session which I was assigned to as trainer{' '}
                  </span>
                </Checkbox>
              )}

              <Item style={{ margin: '0 auto 20' }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  label="Sign Up"
                  width="100%"
                  height="100%"
                  style={{ fontSize: '19px' }}
                  loading={loading}
                  disabled={!givenPermission}
                  onClick={this.handleSubmit}
                >
                  Sign Up
                </Button>
              </Item>

              <Redirecting>
                Already have an account?{' '}
                <StyledLink to="/login">LOGIN</StyledLink>
              </Redirecting>
            </Form>
          </ContentWrapper>
        </Wrapper>
      </>
    );
  }
}

const mapStateToProps = state => {
  const officialLocalLeads =
    (state.fetchedData.localLeadsList &&
      state.fetchedData.localLeadsList.filter(
        ({ officialLocalLead }) => officialLocalLead
      )) ||
    [];

  return {
    localLeads: officialLocalLeads,
    isAuthenticated: state.auth.isAuthenticated,
    isEmailUnique: state.auth.isEmailUnique,
    isDeskTop: state.checkBrowserWidth.isDeskTop,
    loading: state.loading.signupLoading,
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
