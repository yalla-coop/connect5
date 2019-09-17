/* eslint-disable react/no-did-update-set-state */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Checkbox, Modal } from 'antd';
import history from '../../../history';

import { fetchLocalLeads, addTrainerToGroup } from '../../../actions/users';
import { checkUniqeEmail } from '../../../actions/authAction';
import { resetgroup, resetUniqueEmail } from '../../../actions/reset';

import Button from '../../common/Button';
import Header from '../../common/Header';

import {
  Wrapper,
  ContentWrapper,
  Form,
  Input,
  Select,
  Item,
  Bold,
  Paragraph,
  BackContainer,
  BackLink,
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
    confirmLoading: false,
    selectOtherGroup: false,
    officialLocalLead: '',
    userAsManager: false,
    additionalManager: '',
  };

  componentDidMount() {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      return history.push('/');
    }
    const { fetchLocalLeads: fetchLocalLeadsActionCreator } = this.props;

    return fetchLocalLeadsActionCreator();
  }

  // componentDidUpdate() {
  //   this.checkManager();
  // }

  handleOk = e => {
    this.setState({ confirmLoading: true });
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
    const {
      form,
      addTrainerToGroup: addTrainerToGroupAction,
      isEmailUnique,
    } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        addTrainerToGroupAction(
          {
            ...values,
            newUser: isEmailUnique,
            localLead: values.localLead.key,
            localLeadName: values.localLead.label,
          },
          // callback function to be called when response come back
          this.handleSuccessOk
        );
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
    const { location } = this.props;
    if (location.state) {
      history.push({
        pathname: '/create-session',
        state: location.state,
      });
    }

    this.setState({ confirmLoading: false });
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

  // handles checkboxes to add trainer managers

  onChangeCheckbox = e => {
    this.setState({
      selectOtherGroup: e.target.checked,
      additionalManager: '',
    });
  };

  addUserAsManager = e => {
    this.setState({ userAsManager: e.target.checked });
  };

  addOfficialLocalLead = localLead => {
    this.setState({ officialLocalLead: localLead });
  };

  addManager = manager => {
    this.setState({ additionalManager: manager });
  };

  render() {
    const { confirmLoading, selectOtherGroup } = this.state;
    const {
      form: { getFieldDecorator },
      localLeads,
      checkedUserInfo,
      isEmailUnique,
      addTrainerLoading,
    } = this.props;
    console.log(this.state);

    return (
      <Wrapper>
        <Header type="view" label="Add new trainer" />
        <BackContainer>
          <BackLink onClick={history.goBack}>{`< Back`}</BackLink>
        </BackContainer>
        <ContentWrapper className="add-trainer">
          <Modal
            visible={isEmailUnique === false}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            title="Account already exists"
            confirmLoading={confirmLoading}
          >
            <Paragraph>
              Good news, <Bold>{checkedUserInfo.name}</Bold> (
              {checkedUserInfo.email}) is already registered on the app!
            </Paragraph>
            <Paragraph>
              You can either add the trainer to your group or choose a different
              person as the trainer&apos;s manager.
            </Paragraph>
            <Checkbox
              onChange={this.addUserAsManager}
              style={{
                textAlign: 'left',
                marginBottom: '24px',
              }}
            >
              <span style={{ fontSize: '.9rem' }}>
                Add <Bold>{checkedUserInfo.name}</Bold> to my group
              </span>
            </Checkbox>
            <Checkbox
              onChange={this.onChangeCheckbox}
              style={{
                textAlign: 'left',
                marginBottom: '24px',
              }}
            >
              <span style={{ fontSize: '.9rem' }}>
                Add <Bold>{checkedUserInfo.name}</Bold> to another group
              </span>
            </Checkbox>
            {localLeads && selectOtherGroup && (
              <Fragment>
                <Paragraph>
                  Please select a local lead or trainer manager
                </Paragraph>
                <OtherGroupSelect
                  placeholder="Select trainer manager/ local lead"
                  option="existing-trainer"
                  getFieldDecorator={getFieldDecorator}
                  localLeads={localLeads}
                  handleSelectChange={this.addManager}
                />
              </Fragment>
            )}
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
            {(isEmailUnique || isEmailUnique === null) && localLeads && (
              <OfficialLocalLeadSelect
                placeholder="Official Connect 5 Local Lead"
                option="new-trainer"
                getFieldDecorator={getFieldDecorator}
                localLeads={localLeads}
                handleSelectChange={this.addOfficialLocalLead}
              />
            )}
            <Checkbox
              onChange={this.addUserAsManager}
              style={{
                textAlign: 'left',
                marginBottom: '24px',
              }}
            >
              <span style={{ fontSize: '.9rem' }}>Add trainer to my group</span>
            </Checkbox>
            <Checkbox
              onChange={this.onChangeCheckbox}
              style={{
                textAlign: 'left',
                marginBottom: '24px',
              }}
            >
              <span style={{ fontSize: '.9rem' }}>
                Add trainer to another group
              </span>
            </Checkbox>
            {selectOtherGroup && (
              <Fragment>
                <Paragraph>
                  Please select a local lead or trainer manager
                </Paragraph>
                <OtherGroupSelect
                  placeholder="Select trainer manager/ local lead"
                  option="existing-trainer"
                  getFieldDecorator={getFieldDecorator}
                  localLeads={localLeads}
                  handleSelectChange={this.addManager}
                />
              </Fragment>
            )}
            <Item as="div" style={{ margin: '20px auto 40px', height: '50px' }}>
              <Button
                type="primary"
                htmlType="submit"
                label="Submit"
                width="100%"
                height="100%"
                style={{ fontSize: '19px' }}
                loading={addTrainerLoading}
              />
            </Item>
          </Form>
        </ContentWrapper>
      </Wrapper>
    );
  }
}

const OfficialLocalLeadSelect = ({
  getFieldDecorator,
  localLeads,
  handleSelectChange,
}) => (
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
        <Select
          placeholder="Please select the official local lead"
          size="large"
          labelInValue
          onChange={handleSelectChange}
        >
          {localLeads &&
            localLeads
              .filter(({ officialLocalLead }) => officialLocalLead)
              .map(({ name, _id }) => (
                <Option value={_id} key={_id}>
                  {name}
                </Option>
              ))}
        </Select>
      )}
    </Item>
  </div>
);

const OtherGroupSelect = ({ localLeads, handleSelectChange }) => (
  <div className="add-trainer__select">
    <Item style={{ margin: '20px auto 40px', height: '50px' }}>
      <Select
        placeholder="Select trainer manager/ local lead"
        size="large"
        labelInValue
        onChange={handleSelectChange}
      >
        {localLeads &&
          localLeads.map(({ name, _id }) => (
            <Option value={_id} key={_id}>
              {name}
            </Option>
          ))}
      </Select>
    </Item>
  </div>
);

const mapStateToProps = state => {
  return {
    localLeads: state.fetchedData.localLeadsList,
    isAuthenticated: state.auth.isAuthenticated,
    isEmailUnique: state.auth.isEmailUnique,
    officialLocalLead: state.auth.officialLocalLead,
    checkedUserInfo: state.auth.checkedUserInfo,
    group: state.groups,
    addTrainerLoading: state.loading.addTrainerLoading,
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
