import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, Checkbox } from 'antd';
import history from '../../../../history';
import { fetchSessionDetails } from '../../../../actions/groupSessionsAction';
// ANTD COMPONENTS

// COMMON COMPONENTS
import Spin from '../../../common/Spin';
import Header from '../../../common/Header';
import Button from '../../../common/Button';

// STYLE
import {
  InviteSectionWrapper,
  BackLink,
  BackContainer,
  Form,
  InputDiv,
} from './Invite&Promote.style';

const { Option } = Select;

class SendInvitaion extends Component {
  state = {
    participantsEmails: ['example@gmail.com'],
    sendByEmail: false,
  };

  onEmailChange = value => {
    this.setState({
      participantsEmails: value,
    });
  };

  onCheckboxChange = e => {
    this.setState({ sendByEmail: e.target.checked });
  };

  onFormSubmit = event => {
    event.preventDefault();
    const { participantsEmails, sendByEmail } = this.state;
  };

  render() {
    const { participantsEmails } = this.state;
    const { onEmailChange, onFormSubmit } = this;

    return (
      <InviteSectionWrapper>
        <Header type="view" label="Invitee List" />
        <BackContainer>
          <BackLink onClick={history.goBack}>{`< Back`}</BackLink>
        </BackContainer>
        <Form>
          <InputDiv>
            <Select
              mode="tags"
              size="large"
              placeholder="emails"
              onChange={onEmailChange}
              defaultValue="example@gmail.com"
              style={{ width: '100%', height: '100%' }}
            >
              {participantsEmails.map(email => (
                <Option key={email} value={email}>
                  {email}
                </Option>
              ))}
            </Select>
          </InputDiv>
          <InputDiv>
            <Checkbox onChange={this.onCheckboxChange}>
              Send the survey to participants by email
            </Checkbox>
          </InputDiv>
          <InputDiv>
            <Button
              onClick={onFormSubmit}
              type="primary"
              label="Update"
              height="40px"
              width="100%"
            />
          </InputDiv>
        </Form>
      </InviteSectionWrapper>
    );
  }
}

const mapStateToProps = state => ({
  sessionDetails: state.sessions.sessionDetails[0],
});

export default connect(
  mapStateToProps,
  { fetchSessionDetails }
)(SendInvitaion);
