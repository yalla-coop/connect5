import React, { Component } from 'react';

import { captalizesName } from '../../../helpers/createGroupedLocalLeads';
import { getAllSurveyLinks, getSessionSurveys } from '../../../helpers';
import Header from '../../common/Header';
import Spin from '../../common/Spin';

// STYLING
import {
  Wrapper,
  DetailsContent,
  Detail,
  BoldSpan,
  Row,
  DeteteAccountBtn,
  StyledLink,
} from './PrintSessionDetails.style';

export default class PrintSessionDetails extends Component {
  render() {
    const {
      location: {
        state: { details },
      },
    } = this.props;

    const {
      sessionDate,
      sessionRegion,
      sessionShortId,
      sessionTrainers,
      sessionType,
    } = details;

    const links = getAllSurveyLinks(sessionType, sessionShortId);

    return (
      <Wrapper>
        <Header type="section" label="Connect 5 Session Details" />
        <DetailsContent>
          <Row>
            <Detail>
              <BoldSpan>Session Type: </BoldSpan>
              {sessionType}
            </Detail>
          </Row>
          <Row>
            <Detail>
              <BoldSpan>Date: </BoldSpan>
              {sessionDate}
            </Detail>
          </Row>
          <Row>
            <Detail>
              <BoldSpan>Region: </BoldSpan>
              {sessionRegion}
            </Detail>
          </Row>
          <Row>
            <Detail>
              <BoldSpan>Trainers: </BoldSpan>
              {sessionTrainers.map(el => (
                <div>
                  <span>{captalizesName(el.name)} </span> ({el.email})
                </div>
              ))}
            </Detail>
          </Row>
          <Row>
            <Detail>
              {getSessionSurveys(sessionType).map((survey, index) => (
                <div>
                  <li style={{ listStyleType: 'none' }}>
                    {' '}
                    <BoldSpan>
                      {`${survey.split('-')[0]}-${survey.split('-')[1]}-survey`}
                      :{' '}
                    </BoldSpan>
                    {links[index]}
                  </li>
                </div>
              ))}
            </Detail>
          </Row>
          <Row>
            <Detail>
              <BoldSpan>Important information regarding surveys: </BoldSpan>
              As a participant we ask you to fill in required surveys. As soon
              as you've submitted your first Connect 5 survey you will be able
              to log in using the Connect 5 App. You can then donwload your
              certificate, view behavioural insights and course materials.
            </Detail>
          </Row>
        </DetailsContent>
      </Wrapper>
    );
  }
}
