/* eslint-disable react/no-did-update-set-state */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Checkbox, Modal, Popover, Button as AntdButton } from 'antd';
import history from '../../../history';

import { fetchLocalLeads, addTrainerToGroup } from '../../../actions/users';
import { checkUniqeEmail } from '../../../actions/authAction';
import { resetgroup, resetUniqueEmail } from '../../../actions/reset';

import { createGroupedLocalLeads } from '../../../helpers/createGroupedLocalLeads';

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
  CheckboxWrapper,
  H2,
  LabelDiv,
  Ol,
} from './AddTrainer.style';

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

const iniitialState = {
  confirmLoading: false,
  selectOtherGroup: false,
  officialLocalLead: '',
  officialLocalLeadSelect: '',
  userAsManager: false,
  additionalManager: '',
};

class AddTrainer extends Component {
  state = iniitialState;

  componentWillMount() {
    const { group } = this.props;
    // reload page if errors in state
    if (group.error && group.error.length) {
      window.location.reload();
    }
  }

  componentDidMount() {
    const { isAuthenticated } = this.props;

    if (!isAuthenticated) {
      return history.push('/');
    }

    const { fetchLocalLeads: fetchLocalLeadsActionCreator } = this.props;
    return fetchLocalLeadsActionCreator();
  }

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
    e.preventDefault();

    const {
      form,
      addTrainerToGroup: addTrainerToGroupAction,
      isEmailUnique,
      userInfo,
    } = this.props;

    const {
      userAsManager,
      additionalManager,
      officialLocalLeadSelect,
    } = this.state;

    // set up managers array and run addTrainertoGroup action on each element
    const managers = [];

    if (userAsManager && userInfo.id !== additionalManager.key) {
      managers.push({ key: userInfo.id, label: userInfo.name });
    }
    if (additionalManager.key) {
      managers.push(additionalManager);
    }
    if (officialLocalLeadSelect) {
      managers.push(officialLocalLeadSelect);
    }

    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        addTrainerToGroupAction({
          ...values,
          newUser: isEmailUnique,
          managers: managers.length > 0 && managers,
        });

        // callback function to be called when response come back
        this.handleSuccessOk();
      }
    });
  };

  handleEmailBlur = e => {
    const {
      checkUniqeEmail: checkUniqeEmailActionCreator,
      userInfo,
    } = this.props;

    const { value } = e.target;

    if (value && value.trim() !== userInfo.email) {
      checkUniqeEmailActionCreator(value);
    }
  };

  validateEmailDupl = (rule, value, cb) => {
    const { form, userInfo } = this.props;

    if (userInfo.email === form.getFieldValue('email')) {
      cb('You cannot select your own email!');
    } else {
      cb();
    }
  };

  handleSuccessOk = () => {
    const {
      location,
      form,
      resetUniqueEmail: resetUniqueEmailAction,
      resetgroup: resetgroupAction,
    } = this.props;

    const { resetFields } = form;
    if (location.state) {
      history.push({
        pathname: '/create-session',
        state: location.state,
      });
    }

    this.setState({ confirmLoading: false });

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

  addManager = manager => {
    this.setState({ additionalManager: manager });
  };

  addOfficialLocalLead = localLead => {
    const { additionalManager } = this.state;
    this.setState({ officialLocalLeadSelect: localLead, userAsManager: true });
    // if select themselves as local lead, remove from someone else group if selected
    if (additionalManager && additionalManager.key === localLead.key) {
      this.setState({ selectOtherGroup: false, additionalManager: '' });
    }
  };

  render() {
    const {
      confirmLoading,
      selectOtherGroup,
      userAsManager,
      additionalManager,
      officialLocalLeadSelect,
    } = this.state;
    const {
      form: { getFieldDecorator },
      localLeads,
      checkedUserInfo,
      isEmailUnique,
      addTrainerLoading,
      userInfo,
    } = this.props;

    // gets all managers of a trainer
    const trainersManagers =
      localLeads &&
      localLeads
        .map(({ _id, name }) =>
          checkedUserInfo.managers && checkedUserInfo.managers.includes(_id)
            ? { _id, name }
            : null
        )
        .filter(el => el !== null);

    const trainerManagersIds = trainersManagers.map(({ _id }) => _id);

    // gets all available managers of a trainer other than the user
    const availableManagers =
      localLeads &&
      localLeads
        .map(el => {
          // remove the user as an option
          if (el._id === userInfo.id) {
            return null;
          }
          // check if user selected themselves as trainer's local lead and take id out of array
          if (
            officialLocalLeadSelect &&
            el._id === officialLocalLeadSelect.key
          ) {
            return null;
          }
          // check if current manager is inside trainer's managers array and take id out of array
          if (
            checkedUserInfo.managers &&
            checkedUserInfo.managers.includes(el._id)
          ) {
            return null;
          }
          return el;
        })
        .filter(el => el !== null);

    const content = (
      <div style={{ maxWidth: '250px', margin: '0 auto' }}>
        <h3 style={{ fontWeight: '400', fontSize: '1.2rem' }}>
          This is how it works:
        </h3>
        <p>
          You can choose to{' '}
          <strong>
            register a new trainer and add him/ her to several groups
          </strong>
          . In case the <strong>trainer is already registered</strong> on the
          app and/ or is already part of respective groups you will get a
          notfication. <strong>You can add trainers to multiple groups</strong>.
          You can then set up sessions for this trainer and view related session
          feedback. Once you've added a trainer he/ she will get an{' '}
          <strong>
            email with login details and a notification to what group(s) he/ she
            was added to
          </strong>
          .
        </p>{' '}
        <p>
          <strong>Note:</strong> Trainers can always login and remove themselves
          from groups.
        </p>
      </div>
    );
    const addingTrainerPopover = (
      <LabelDiv>
        <H2>Adding a trainer to groups</H2>
        <Popover content={content} style={{ marginRight: '2rem' }}>
          <button type="button" style={{ background: 'none', border: 'none' }}>
            <i
              className="fas fa-question-circle"
              style={{
                color: '#9FCE67',
                marginLeft: '1rem',
                marginBottom: '0.7rem',
              }}
            />
          </button>
        </Popover>
      </LabelDiv>
    );

    const groupedLocalLeads = createGroupedLocalLeads(localLeads);
    const groupedAvailabelManagers = createGroupedLocalLeads(availableManagers);

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
            title="Trainer account already exists"
            confirmLoading={confirmLoading}
            footer={[
              <AntdButton key="back" onClick={this.handleCancel}>
                Return
              </AntdButton>,
              <AntdButton
                key="submit"
                type="primary"
                loading={confirmLoading}
                onClick={this.handleOk}
                disabled={
                  !userAsManager && !Object.keys(additionalManager).length
                }
              >
                Add
              </AntdButton>,
            ]}
          >
            <Paragraph>
              Good news, <Bold>{checkedUserInfo.name}</Bold> (
              {checkedUserInfo.email}) is already registered on the app!
            </Paragraph>
            {addingTrainerPopover}
            <Paragraph>
              You can either add the trainer to your group or choose a different
              person as the trainer&apos;s manager.
            </Paragraph>
            <Paragraph>
              <Bold style={{ color: 'red' }}>Important:</Bold>{' '}
              <Bold>{checkedUserInfo.name}</Bold> is already registered in the
              following groups:{' '}
            </Paragraph>
            <Ol>
              {trainersManagers.map(({ _id, name }) => (
                <li key={_id}>
                  <Bold>{name}</Bold>
                </li>
              ))}
            </Ol>
            <CheckboxWrapper>
              <Checkbox
                disabled={trainerManagersIds.includes(userInfo.id)}
                onChange={this.addUserAsManager}
                style={{
                  textAlign: 'center',
                  marginBottom: '24px',
                }}
              >
                <span style={{ fontSize: '1rem', fontWeight: '700' }}>
                  Add <Bold>{checkedUserInfo.name}</Bold> to my group
                </span>
              </Checkbox>
              <Checkbox
                disabled={!availableManagers.length}
                onChange={this.onChangeCheckbox}
                style={{
                  textAlign: 'center',
                  marginBottom: '24px',
                }}
              >
                <span style={{ fontSize: '1rem', fontWeight: '700' }}>
                  Add <Bold>{checkedUserInfo.name}</Bold> to another group
                </span>
              </Checkbox>
            </CheckboxWrapper>
            {localLeads && selectOtherGroup && (
              <Fragment>
                <Paragraph>
                  Please select a local lead or trainer manager
                </Paragraph>
                <OtherGroupSelect
                  placeholder="Select trainer manager/ local lead"
                  option="existing-trainer"
                  getFieldDecorator={getFieldDecorator}
                  localLeads={groupedAvailabelManagers}
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
                    message: 'The input is not valid email!',
                  },
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                  {
                    validator: this.validateEmailDupl,
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
              <CheckboxWrapper>
                {addingTrainerPopover}
                <Paragraph>
                  <Bold>Step 1:</Bold> Select the official local lead managing
                  this trainer (required).
                </Paragraph>
                <OfficialLocalLeadSelect
                  placeholder="Official Connect 5 Local Lead"
                  option="new-trainer"
                  getFieldDecorator={getFieldDecorator}
                  localLeads={groupedLocalLeads}
                  handleSelectChange={this.addOfficialLocalLead}
                />
                {officialLocalLeadSelect &&
                  userInfo.id === officialLocalLeadSelect.key && (
                    <Paragraph
                      style={{ fontStyle: 'italic', textAlign: 'center' }}
                    >
                      As their official Local Lead, the trainer will be
                      automatically added to your group of trainers.
                    </Paragraph>
                  )}
              </CheckboxWrapper>
            )}
            {(!userInfo.officialLocalLead ||
              userInfo.id !== officialLocalLeadSelect.key) && (
              <CheckboxWrapper>
                <Paragraph
                  style={{ opacity: officialLocalLeadSelect.key ? '1' : '0.5' }}
                >
                  <Bold>Step 2:</Bold> Add the trainer to your own group of
                  trainers to manage sessions and view results (optional).
                </Paragraph>
                {officialLocalLeadSelect.key && (
                  <Checkbox
                    disabled={!officialLocalLeadSelect.key}
                    onChange={this.addUserAsManager}
                    style={{
                      textAlign: 'center',
                      marginBottom: '24px',
                    }}
                  >
                    <span style={{ fontSize: '1rem', fontWeight: '700' }}>
                      Add trainer to my group
                    </span>
                  </Checkbox>
                )}
              </CheckboxWrapper>
            )}

            <CheckboxWrapper>
              <Paragraph
                style={{ opacity: officialLocalLeadSelect.key ? '1' : '0.5' }}
              >
                <Bold>
                  Step {userInfo.id === officialLocalLeadSelect.key ? '2' : '3'}
                  :
                </Bold>{' '}
                Add trainer to a group managed by someone else (optional).
              </Paragraph>
              {officialLocalLeadSelect.key && (
                <Checkbox
                  disabled={!officialLocalLeadSelect.key}
                  onChange={this.onChangeCheckbox}
                  style={{
                    textAlign: 'center',
                    marginBottom: '24px',
                  }}
                  checked={selectOtherGroup}
                >
                  <span style={{ fontSize: '1rem', fontWeight: '700' }}>
                    Add trainer to another group
                  </span>
                </Checkbox>
              )}
            </CheckboxWrapper>
            {selectOtherGroup && (
              <Fragment>
                <Paragraph>
                  Please select a local lead or trainer manager
                </Paragraph>
                <OtherGroupSelect
                  placeholder="Select trainer manager/ local lead"
                  option="existing-trainer"
                  getFieldDecorator={getFieldDecorator}
                  localLeads={groupedAvailabelManagers}
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
    <Item style={{ margin: '8px auto 16px', height: '50px' }}>
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
          {Object.keys(localLeads).map(item => (
            <OptGroup key={`OptGroup${item}`} label={item}>
              {localLeads[item]
                .filter(el => el.officialLocalLead === true)
                .map(_localLead => {
                  return (
                    <Option key={_localLead._id} value={_localLead._id}>
                      {_localLead.name}
                    </Option>
                  );
                })}
            </OptGroup>
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
        {Object.keys(localLeads).map(item => (
          <OptGroup key={`OptGroup2${item.region}`} label={item}>
            {localLeads[item].map(_localLead => {
              return (
                <Option key={_localLead._id} value={_localLead._id}>
                  {_localLead.name}
                </Option>
              );
            })}
          </OptGroup>
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
    userInfo: state.auth,
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
