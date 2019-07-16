/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import history from '../../../history';

import { fetchLocalLeads, addTrainerToGroup } from '../../../actions/users';
import { checkUniqeEmail } from '../../../actions/authAction';
import { resetgroup, resetUniqueEmail } from '../../../actions/reset';

import Button from '../../common/Button';

import {
  Wrapper,
  ContentWrapper,
  Form,
  Input,
  Select,
  Item,
  Bold,
  Paragraph,
} from './AddTrainer.style';

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

class AddTrainer extends Component {
  state = {};

  componentDidMount() {
    const { isAuthenticated, history } = this.props;
    if (!isAuthenticated) {
      return history.push('/');
    }
    const { fetchLocalLeads: fetchLocalLeadsActionCreator } = this.props;
    return fetchLocalLeadsActionCreator();
  }

  componentDidUpdate() {
    const { group } = this.props;
    if (group.loaded && group.success) {
      Modal.success({
        title: 'Done!',
        content: group.success,
        onOk: this.handleSuccessOk,
      });
    }
    if (group.loaded && group.error) {
      Modal.error({
        title: 'Error',
        content: group.error,
        onOk: this.handleSuccessOk,
      });
    }
  }

  handleOk = e => {
    this.handleSubmit(e);
  };

  handleCancel = () => {
    const {
      form,
      resetUniqueEmail: resetUniqueEmailAction,
      resetgroup: resetgroupAction,
    } = this.props;
    const { resetFields } = form;
    resetFields();
    resetUniqueEmailAction();
    resetgroupAction();
  };

  handleSubmit = e => {
    const { allowAddUsedEmail } = this.state;
    const { form, addTrainerToGroup: addTrainerToGroupAction } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        addTrainerToGroupAction({
          ...values,
          newUser: !allowAddUsedEmail,
          localLead: values.localLead.key,
          localLeadName: values.localLead.label,
        }).then(() => history.push('/dashboard'));
      }
    });
  };

  handleEmailBlur = e => {
    const { checkUniqeEmail: checkUniqeEmailActionCreator } = this.props;
    const { value } = e.target;
    if (value) {
      checkUniqeEmailActionCreator(value);
    }
  };

  handleSuccessOk = () => {
    const { location, history } = this.props;
    if (location.state) {
      history.push({
        pathname: '/create-session',
        state: location.state,
      });
    }
    const {
      form,
      resetUniqueEmail: resetUniqueEmailAction,
      resetgroup: resetgroupAction,
    } = this.props;
    const { resetFields } = form;
    resetFields();
    resetUniqueEmailAction();
    resetgroupAction();
  };

  render() {
    const {
      form: { getFieldDecorator },
      localLeads,
      checkedUserInfo,
      isEmailUnique,
    } = this.props;

    return (
      <Wrapper>
        <ContentWrapper className="add-trainer">
          <Modal
            visible={isEmailUnique === false}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            title="Account already exists"
          >
            <Paragraph>
              Good news, <Bold>{checkedUserInfo.name}</Bold> (
              <Bold>{checkedUserInfo.email}</Bold>) has created an account for
              themselves already.
            </Paragraph>
            <Paragraph>
              Would you like to add this trainer to your group?
            </Paragraph>
            <LocalLeadSelect
              getFieldDecorator={getFieldDecorator}
              localLeads={localLeads}
            />
          </Modal>

          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item hasFeedback style={{ margin: '20px auto 40px' }}>
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
              })(
                <Input
                  placeholder="Email"
                  onBlur={this.handleEmailBlur}
                  size="large"
                  style={{ height: '50px' }}
                />
              )}
            </Item>
            <Item hasFeedback style={{ margin: '20px auto 40px' }}>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: isEmailUnique || isEmailUnique === null,
                    message: 'Please input your name!',
                  },
                  {
                    min: 3,
                    message: 'Please input valid name',
                  },
                ],
              })(
                <Input
                  placeholder="Name"
                  size="large"
                  style={{ height: '50px' }}
                />
              )}
            </Item>
            <div className="add-trainer__select">
              <Item style={{ margin: '20px auto 40px', height: '50px' }}>
                {getFieldDecorator('region', {
                  rules: [
                    {
                      required: isEmailUnique || isEmailUnique === null,
                      message: 'Please select your region',
                    },
                  ],
                })(
                  <Select
                    placeholder="Region"
                    size="large"
                    style={{ height: '50px' }}
                  >
                    {regions.map(region => (
                      <Option value={region} key={region}>
                        {region}
                      </Option>
                    ))}
                  </Select>
                )}
              </Item>
            </div>
            {(isEmailUnique || isEmailUnique === null) && (
              <LocalLeadSelect
                getFieldDecorator={getFieldDecorator}
                localLeads={localLeads}
              />
            )}

            <Item as="div" style={{ margin: '20px auto 40px', height: '50px' }}>
              <Button
                type="primary"
                htmlType="submit"
                label="Submit"
                width="100%"
                height="100%"
                style={{ fontSize: '19px' }}
              />
            </Item>
          </Form>
        </ContentWrapper>
      </Wrapper>
    );
  }
}

const LocalLeadSelect = ({ getFieldDecorator, localLeads }) => (
  <div className="add-trainer__select">
    <Item style={{ margin: '20px auto 40px', height: '50px' }}>
      {getFieldDecorator('localLead', {
        rules: [
          {
            required: true,
            message: 'Please select your local lead',
          },
        ],
      })(
        <Select placeholder="Local Lead" size="large" labelInValue>
          {localLeads &&
            localLeads.map(({ name, _id }) => (
              <Option value={_id} key={_id}>
                {name}
              </Option>
            ))}
        </Select>
      )}
    </Item>
  </div>
);

const mapStateToProps = state => {
  return {
    localLeads: state.fetchedData.localLeadsList,
    isAuthenticated: state.auth.isAuthenticated,
    isEmailUnique: state.auth.isEmailUnique,
    checkedUserInfo: state.auth.checkedUserInfo,
    group: state.groups,
  };
};

export default connect(
  mapStateToProps,
  {
    fetchLocalLeads,
    checkUniqeEmail,
    addTrainerToGroup,
    resetgroup,
    resetUniqueEmail,
  }
)(Form.create({ name: 'AddTrainer' })(AddTrainer));
