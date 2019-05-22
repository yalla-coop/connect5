import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Modal } from 'antd';
import { fetchLocalLeads } from '../../../actions/users';
import { checkUniqeEmail } from '../../../actions/authAction';

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
  state = {
    visible: false,
    isNameRequired: true,
    isRegionRequired: true,
    allowAddUsedEmail: false,
  };

  componentDidMount() {
    const { isAuthenticated, history } = this.props;
    if (!isAuthenticated) {
      return history.push('/');
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

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    this.setState(
      {
        // visible: false,
        allowAddUsedEmail: true,
      },
      () => {
        this.handleSubmit(e);
      }
    );
  };

  handleCancel = () => {
    const { form } = this.props;
    const { resetFields } = form;
    resetFields();

    this.setState({
      visible: false,
      isNameRequired: true,
      isRegionRequired: true,
      allowAddUsedEmail: false,
    });
  };

  handleSubmit = e => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('submitting', values);

        // post data to back-end
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

  validateUniqueEmail = (rule, value, callback) => {
    const { isEmailUnique } = this.props;
    const { allowAddUsedEmail } = this.state;

    if (value && isEmailUnique === null) {
      callback();
    } else if (value && !isEmailUnique && !allowAddUsedEmail) {
      callback(true);
      this.setState({
        visible: true,
        isNameRequired: false,
        isRegionRequired: false,
      });
    } else {
      callback();
    }
  };

  render() {
    const {
      form: { getFieldDecorator },
      localLeads,
      checkedUserInfo,
    } = this.props;

    const { visible, isNameRequired, isRegionRequired } = this.state;
    return (
      <Wrapper>
        <ContentWrapper>
          <Modal
            visible={visible}
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
                  {
                    message: 'Already registered',
                    validator: this.validateUniqueEmail,
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
                    required: isNameRequired,
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
            <Item style={{ margin: '20px auto 40px', height: '50px' }}>
              {getFieldDecorator('region', {
                rules: [
                  {
                    required: isRegionRequired,
                    message: 'Please select your region',
                  },
                ],
              })(
                <div className="add-trainer__select">
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
                </div>
              )}
            </Item>
            {!visible && (
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
const mapStateToProps = state => {
  return {
    localLeads: state.fetchedData.localLeadsList,
    isAuthenticated: state.auth.isAuthenticated,
    isEmailUnique: state.auth.isEmailUnique,
    checkedUserInfo: state.auth.checkedUserInfo,
  };
};

export default connect(
  mapStateToProps,
  {
    fetchLocalLeads,
    checkUniqeEmail,
  }
)(Form.create({ name: 'AddTrainer' })(AddTrainer));

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
        <Select placeholder="Local Lead" size="large">
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
