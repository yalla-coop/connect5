import React from 'react';
import moment from 'moment';

import { Divider } from 'antd';

import {
  Text,
  EmailWrapper,
  EmailText,
  BoldSpan,
} from '../SessionDetails.Style';

const EmailTemplate = ({ activeEmailTemplate }) => {
  console.log('activeEmailTemplate', activeEmailTemplate);
  return (
    <div>
      <EmailWrapper>
        <div>
          <Text>
            Date:{' '}
            {activeEmailTemplate
              ? moment(activeEmailTemplate.sendDate).format('DD-MM-YYYY')
              : 'N/A'}
          </Text>
        </div>
        <div>
          <Text>Message:</Text>
        </div>
        <EmailText>Dear course participants,</EmailText>
        <EmailText>
          This is a friendly reminder related to the following Connect 5
          training session:
        </EmailText>
        <ul style={{ paddingLeft: '2rem', marginTop: '1rem' }}>
          <li>
            <EmailText>
              <BoldSpan>Session Date:</BoldSpan>{' '}
              {(activeEmailTemplate.sessionDate &&
                moment(activeEmailTemplate.sessionDate).format(
                  'DD MMM YYYY'
                )) ||
                'N/A'}
            </EmailText>
          </li>
          <li>
            <EmailText>
              <BoldSpan>Session Type:</BoldSpan>{' '}
              {activeEmailTemplate.sessionType || 'N/A'}
            </EmailText>
          </li>

          <li>
            <EmailText>
              <BoldSpan>Addressline 1: </BoldSpan>{' '}
              {(activeEmailTemplate.address &&
                activeEmailTemplate.address.addressLine1) ||
                'N/A'}
            </EmailText>
          </li>

          <li>
            <EmailText>
              <BoldSpan>Addressline 2: </BoldSpan>{' '}
              {(activeEmailTemplate.address &&
                activeEmailTemplate.address.addressLine2) ||
                'N/A'}
            </EmailText>
          </li>
          <li>
            <EmailText>
              <BoldSpan>Postcode: </BoldSpan>{' '}
              {(activeEmailTemplate.address &&
                activeEmailTemplate.address.postcode) ||
                'N/A'}
            </EmailText>
          </li>
          <li>
            <EmailText>
              <BoldSpan>time: From</BoldSpan>{' '}
              {activeEmailTemplate.startTime || 'N/A'} <BoldSpan>To</BoldSpan>{' '}
              {activeEmailTemplate.endTime || 'N/A'}
            </EmailText>
          </li>
          <li>
            <EmailText>
              <BoldSpan>Trainer(s):</BoldSpan>{' '}
              {activeEmailTemplate.trainers || 'N/A'}
            </EmailText>
          </li>
        </ul>
        <EmailText>
          To track your own progress and to ensure that our trainings are
          effective we rely on course participants to fill out surveys after
          each session. All the data is anonymised. After answering surveys you
          can immediately see your own progress and access certificates via the
          app. You will receive a link to the post-session survey from your
          trainers.
        </EmailText>
        {activeEmailTemplate.preSurveyLink && (
          <>
            <br />
            <EmailText>
              <b>
                Before starting the training session please follow this link and
                fill out the{' '}
                <a
                  href={activeEmailTemplate.preSurveyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  pre-survey
                </a>
                .
              </b>
            </EmailText>
          </>
        )}

        <br />

        {activeEmailTemplate.extraInformation && (
          <EmailText as="pre">{activeEmailTemplate.extraInformation}</EmailText>
        )}

        <br />
        <EmailText>Sincerely,</EmailText>
        <EmailText>Your Connect 5 team</EmailText>

        <Divider />
        <Text>
          <BoldSpan>Sent To:</BoldSpan>
        </Text>
        {activeEmailTemplate.recipients &&
          activeEmailTemplate.recipients.map(email => (
            <EmailText key={email}>{email}</EmailText>
          ))}
      </EmailWrapper>
    </div>
  );
};

export default EmailTemplate;
