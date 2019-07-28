import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, Checkbox } from 'antd';
import history from '../../../../history';
import { fetchSessionDetails } from '../../../../actions/groupSessionsAction';
import { updateSentEmails } from '../../../../actions/InviteAndPromoteAction';
import { pattern } from '../../../../constants/regex';
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
    newEmails: null,
    sendByEmail: false,
    sendingDate: Date.now(),
    err: '',
  };

  componentDidMount() {
    const { dataList } = this.props;
    const { participantsEmails } = dataList;
    const recipients = [];
    participantsEmails.forEach(recipient => {
      if (recipient.status === 'sent') {
        recipients.push({ email: recipient.email, status: recipient.status });
      }
    });

    this.setState({ recipients });
    // setTimeout(() => {
    //   console.log(this.state.recipients);
    // }, 2000);
  }

  onUpdateEmailsChange = value => {
    const { recipients } = this.state;

    // remaining emails
    const remainingEmails = recipients.filter(item =>
      value.includes(item.email)
    );

    const sentEmails = recipients.map(item => item.email && item.email);

    // new emails
    const newEmails = value.filter(item => sentEmails.indexOf(item) === -1);

    // // check valid new email
    const incorrectEmails = newEmails.filter(item => !pattern.test(item));

    if (incorrectEmails.length > 0) {
      this.setState({
        err: '*please enter valid email',
      });
    } else if (newEmails.length > 0) {
      const newEmailsObj = newEmails.map(email => ({ email, status: 'sent' }));
      this.setState({ newEmails: newEmailsObj });
      this.setState({ recipients: [...remainingEmails, ...newEmailsObj] });
    } else {
      this.setState({ recipients: remainingEmails });
    }
  };

  onCheckboxChange = e => {
    this.setState({ sendByEmail: e.target.checked });
  };

  onFormSubmit = event => {
    event.preventDefault();
    const { recipients, sendByEmail, newEmails, sendingDate } = this.state;
    const {
      updateSentEmails: updateSentEmailsActionCreator,
      sessionDetails,
    } = this.props;

    const {
      date,
      type,
      trainers,
      region,
      _id,
      startTime,
      endTime,
      shortId,
    } = sessionDetails;

    const trainerName = trainers
      .map(trainer => {
        return trainer.name;
      })
      .join(' & ');

    const updatedEmails = recipients.map(email => {
      return {
        email: email.email,
        status: 'sent',
      };
    });

    const updatedEmailsList = {
      updatedEmails,
      sendByEmail,
      newEmails,
      date,
      type,
      trainers,
      region,
      _id,
      startTime,
      endTime,
      shortId,
      trainerName,
    };
    // console.log(updatedEmailsList, 'uuuuuuupdatedEmails');
    updateSentEmailsActionCreator(updatedEmailsList);
  };

  render() {
    const { recipients, err } = this.state;
    const { onUpdateEmailsChange, onFormSubmit } = this;
    console.log(recipients);

    if (!recipients) {
      return <Spin />;
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
              onChange={onUpdateEmailsChange}
              defaultValue={recipients && recipients.map(obj => obj.email)}
              value={recipients.map(item => item.email)}
              style={{ width: '100%', height: '100%' }}
            >
              {recipients &&
                recipients.map(obj => (
                  <Option key={obj.email} value={obj.email}>
                    {obj.email}
                  </Option>
                ))}
            </Select>
          </InputDiv>
          <div>{err}</div>
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
