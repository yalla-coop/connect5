import React, { Component } from 'react';
import styled from 'styled-components';
import Header from '../../common/Header';

import { colors, colorCodes, borders } from '../../../theme';

import { Container } from './Survey.style';
import Button from '../../common/Button';

// component styles
const SectionHeadline = styled.h1`
  font-weight: 400;
  font-size: 2rem;
  padding-top: 1rem;
  color: ${colors.black};
`;

const SectionSubHeadline = styled.h2`
  font-weight: 400;
  font-size: 1.5rem;
  color: ${colors.blackSecondary};
`;

const PromptHeadline = styled.h3`
  font-weight: 300;
  font-size: 1.5rem;
  padding-top: 1rem;
  color: ${colors.black};
`;

const Paragraph = styled.p`
  ${({ strong }) => (strong ? 'font-weight: bold;' : '')}
  color: ${colors.blackSecondary};
`;
const SessionDetails = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${colors.white};
`;

const DetailsDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // border: 1px solid black;
  padding-top: 1rem;
`;

const ButtonDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  padding: 1.5rem;

  button {
    color: ${colors.white};
    background-color: ${colors.blackSecondary};
    border: ${borders.button};
  }

  button: hover {
    color: ${colors.white};
    background-color: ${colors.primary};
  }
`;

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
