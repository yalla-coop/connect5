import React, { Component } from 'react';
import { Alert, Select, Icon } from 'antd';
import EmailTemplate from '../EmailTemplate';
import Button from '../Button';

import {
  Wrapper,
  SuccessMessageDiv,
  SubHeader,
  StyledLink,
  Paragraph,
  Label,
} from './EditEmail.style';

const { Option } = Select;

class EditEmail extends Component {
  render() {
    const {
      successMessage,
      participantEmails,
      //
      // registration
      shortId,

      // template details
      type,
      trainer,
      sessionDate,
      sessionType,
      address,
      trainers,
      startTime,
      endTime,
      extraInfo,
    } = this.props;

    return (
      <Wrapper>
        <SuccessMessageDiv>
          <Alert
            message={
              <span>
                <Icon
                  type="check-circle"
                  theme="filled"
                  style={{ color: '#52c41a', marginRight: '1rem' }}
                />
                {successMessage}
              </span>
            }
            type="success"
          />
        </SuccessMessageDiv>
        <>
          <SubHeader>Registration Link:</SubHeader>
          <StyledLink
            to={`/confirm/${shortId}`}
          >{`${window.location.host}/confirm/${shortId}`}</StyledLink>
          <Paragraph>
            Copy the link above to share with potential participants so they can
            register and let you know about any special requirements.
          </Paragraph>
        </>
        <>
          <SubHeader>Invite Participants via email: </SubHeader>
          <Paragraph>
            Send a session invite to participants via email, providing them a
            link to register and let you know about any special requirements.
          </Paragraph>
        </>
        <>
          <Label>Email addresses:</Label>
          <Select
            showSearch
            id="participantEmails"
            style={{ width: '100%' }}
            placeholder="Type or paste the email addresses here"
            optionFilterProp="children"
            // onChange={onSelectSessionChange}
            size="large"
            // value={session || undefined}
          >
            {participantEmails.map(({ value, name }) => (
              <Option key={value} value={value}>
                {name}
              </Option>
            ))}
          </Select>
        </>
        <>
          <EmailTemplate
            type={type}
            trainer={trainer}
            sessionDate={sessionDate}
            sessionType={sessionType}
            address={address}
            trainers={trainers}
            startTime={startTime}
            endTime={endTime}
            extraInfo={extraInfo}
          />
        </>
        <Button
          // onClick={onFormSubmit}
          type="primary"
          label="Edit email"
          height="40px"
          width="100%"
          style={{ marginBottom: '1.5rem' }}

          // loading={loading}
          // disabled={loading}
        />
        <Button
          // onClick={onFormSubmit}
          type="primary"
          label="Send email"
          height="40px"
          width="100%"
          style={{ marginBottom: '1.5rem' }}
          // loading={loading}
          // disabled={loading}
        />
      </Wrapper>
    );
  }
}

export default EditEmail;
