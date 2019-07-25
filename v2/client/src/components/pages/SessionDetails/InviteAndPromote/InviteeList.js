import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, Checkbox } from 'antd';
import history from '../../../../history';
import { fetchSessionDetails } from '../../../../actions/groupSessionsAction';
import { updateSentEmails } from '../../../../actions/InviteAndPromoteAction';
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
} from './InviteAndPromote.style';

const { Option } = Select;

class InviteeList extends Component {
  state = {
    recipients: null,
    sendByEmail: false,
  };

  componentDidMount() {
    const { dataList } = this.props;
    const { participantsEmails } = dataList;
    const recipients = [];
    participantsEmails.map(recipient => {
      if (recipient.status === 'sent') {
        recipients.push(recipient.email);
      }
    });
    this.setState({ recipients });
  }

  onEmailChange = value => {
    this.setState({
      recipients: value,
    });
  };

  onCheckboxChange = e => {
    this.setState({ sendByEmail: e.target.checked });
  };

  onFormSubmit = event => {
    event.preventDefault();
    const { recipients, sendByEmail } = this.state;
    const { updateSentEmails: updateSentEmailsActionCreator } = this.props;
    const updatedEmails = {
      recipients,
      sendByEmail,
    };
    updateSentEmailsActionCreator(updatedEmails);
  };

  render() {
    const { recipients } = this.state;
    const { onEmailChange, onFormSubmit } = this;

    if (!recipients) {
      return Spin;
    }

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
              defaultValue={recipients && recipients.map(email => email)}
              style={{ width: '100%', height: '100%' }}
            >
              {recipients &&
                recipients.map(email => (
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
  { fetchSessionDetails, updateSentEmails }
)(InviteeList);
