import React, { Component } from './node_modules/react';
import Header from '../../common/Header';

import { Container } from './Survey.style';
import Button from '../../common/Button';

import {
  SectionHeadline,
  SectionSubHeadline,
  PromptHeadline,
  Paragraph,
  SessionDetails,
  DetailsDiv,
  ButtonDiv,
} from './ConfirmSurvey.style';

export default class ConfirmSurvey extends Component {
  // function to create a list of names from an array...
  renderTrainerNames = array =>
    array.map((e, i) =>
      array.length > 1 && array.length - 1 === i
        ? `and ${e.toUpperCase()}`
        : `${e.toUpperCase()} `
    );

  render() {
    const { surveyDetails } = this.props;

    const { sessionDate, trainerNames, surveyType } = surveyDetails;
    return (
      <Container>
        {' '}
        <Header type="home" />
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
          <Button label="Yes" width="100px" height="50px" type="primary" />
          <Button label="No" width="100px" height="50px" type="primary" />
        </ButtonDiv>
      </Container>
    );
  }
}
