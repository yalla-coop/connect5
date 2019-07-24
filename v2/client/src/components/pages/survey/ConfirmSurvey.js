import React, { Component } from 'react';

// Styles
import Button from '../../common/Button';

import { Modal } from 'antd';

import {
  ButtonDiv,
  SessionDetails,
  SectionHeadline,
  SectionSubHeadline,
  PromptHeadline,
  Paragraph,
  DetailsDiv,
  SessionDetailsContainer
} from './Survey.style';

export default class ConfirmSurvey extends Component {
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
    } = this.props;

    return (
      <SessionDetailsContainer>
        <SectionHeadline>Connect 5 Evaluation</SectionHeadline>
        <SectionSubHeadline>{surveyType}</SectionSubHeadline>
        <SessionDetails>
          <DetailsDiv>
            <Paragraph strong>Date of Session: </Paragraph>
            <Paragraph>{sessionDate}</Paragraph>
          </DetailsDiv>
          <DetailsDiv>
            <Paragraph strong>Trainers: </Paragraph>
            <Paragraph>{this.renderTrainerNames(trainerNames)}</Paragraph>
          </DetailsDiv>
         
        </SessionDetails>
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
          {/* need to decide what to do in case user presses no */}
          <Button label="No" width="100px" height="50px" type="primary" onClick={ () => {
          Modal.error({
          title: 'Error!',
          content: "Please make sure that you fill out the correct survey for your session. If these details aren't correct please contact your trainer.",
           })
          }

            } />
        </ButtonDiv>
      </SessionDetailsContainer>
    );
  }
}