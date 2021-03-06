import React, { Component } from 'react';

// Styles
import { Modal } from 'antd';
import Button from '../../common/Button';

import { readableSurveysNamePairs } from '../../../constants';

import {
  ButtonDiv,
  SessionDetails,
  SectionHeadline,
  PromptHeadline,
  Paragraph,
  DetailsDiv,
  SessionDetailsContainer,
  ImportantNote,
} from './Survey.style';

export default class ConfirmSurvey extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  // function to create a list of names from an array...
  renderTrainerNames = array =>
    array.map((e, i) =>
      array.length > 1 && array.length - 1 === i
        ? `and ${e.toUpperCase()}`
        : `${e.toUpperCase()} `
    );

  render() {
    const {
      sessionDate,
      trainerNames,
      surveyType,
      sectionChange,
      researchConfirm,
      sessionType,
    } = this.props;

    return (
      <SessionDetailsContainer>
        <SectionHeadline>Connect 5 Evaluation</SectionHeadline>
        <SessionDetails>
          <DetailsDiv>
            <Paragraph strong>Date of Session: </Paragraph>
            <Paragraph>{sessionDate}</Paragraph>
          </DetailsDiv>
          <DetailsDiv>
            <Paragraph strong>Type of Session: </Paragraph>
            <Paragraph>{sessionType}</Paragraph>
          </DetailsDiv>
          <DetailsDiv>
            <Paragraph strong>Survey Type: </Paragraph>
            <Paragraph>{readableSurveysNamePairs[surveyType]}</Paragraph>
          </DetailsDiv>
          <DetailsDiv>
            <Paragraph strong>Trainers: </Paragraph>
            <Paragraph>{this.renderTrainerNames(trainerNames)}</Paragraph>
          </DetailsDiv>
        </SessionDetails>
        <ImportantNote>
          <strong>Important notice</strong>:{' '}
          <em>
            All data collected will be anonymised and used to evaluate Connect 5
            as a mental wellbeing training programme. Moreover the participant
            will be able to see own results. By clicking Yes the participant
            agrees that submitted feedback data will be used for internal
            evaluation procedures.
          </em>
        </ImportantNote>
        <PromptHeadline>Are these details correct?</PromptHeadline>
        <ButtonDiv>
          <Button
            label="Yes"
            width="100px"
            height="50px"
            type="primary"
            onClick={() => {
              sectionChange('forward');
              researchConfirm();
            }}
          />
          <Button
            label="No"
            width="100px"
            height="50px"
            type="primary"
            onClick={() => {
              sectionChange('forward');
              Modal.error({
                title: 'Wrong Survey?',
                content:
                  "Please make sure that you fill out the correct survey for your session. If these details aren't correct please contact your trainer.",
                onOk: sectionChange('back')
              });
            }}
          />
        </ButtonDiv>
      </SessionDetailsContainer>
    );
  }
}
