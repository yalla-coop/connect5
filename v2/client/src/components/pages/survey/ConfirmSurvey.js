import React, { Component } from 'react';

// Styles
import Button from '../../common/Button';

import {
  ButtonDiv,
  SessionDetails,
  SectionHeadline,
  SectionSubHeadline,
  PromptHeadline,
  Paragraph,
  DetailsDiv,
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
    const { sessionDate, trainerNames, surveyType, sectionChange } = this.props;

    return (
      <div>
        <SectionHeadline>Connect 5 Evaluation</SectionHeadline>
        <SessionDetails>
          <SectionSubHeadline>Survey Details</SectionSubHeadline>
          <DetailsDiv>
            <Paragraph strong>Date of Session: </Paragraph>
            <Paragraph>{sessionDate}</Paragraph>
          </DetailsDiv>
          <DetailsDiv>
            <Paragraph strong>Trainers: </Paragraph>
            <Paragraph>{this.renderTrainerNames(trainerNames)}</Paragraph>
          </DetailsDiv>
          <DetailsDiv>
            <Paragraph strong>Survey Type:</Paragraph>
            <Paragraph>{surveyType}</Paragraph>
          </DetailsDiv>
        </SessionDetails>
        <PromptHeadline>Are these details correct?</PromptHeadline>
        <ButtonDiv>
          <Button
            label="Yes"
            width="100px"
            height="50px"
            type="primary"
            onClick={() => sectionChange('forward')}
          />
          {/* need to decide what to do in case user presses no */}
          <Button label="No" width="100px" height="50px" type="primary" />
        </ButtonDiv>
      </div>
    );
  }
}
