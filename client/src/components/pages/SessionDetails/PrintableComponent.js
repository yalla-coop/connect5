import React from 'react';

import { getAllSurveyLinks, getSessionSurveys } from '../../../helpers';

// STYLING
import {
  DetailsContent,
  Detail,
  BoldSpan,
  Row,
  Title,
  DetailsContentS,
  DetailS,
  BoldSpanS,
  RowS,
  TitleS,
} from './PrintSessionDetails.style';

export default ({
  sessionType,
  sessionDate,
  sessionRegion,
  sessionTrainers,
  address,
  sessionShortId,
}) => {
  let fullAddress = 'TBA';

  if (address) {
    const { addressLine1, addressLine2, postcode } = address;
    fullAddress = [addressLine1, addressLine2, postcode]
      .filter(item => !!item)
      .join(', ');
  }

  const links = getAllSurveyLinks(sessionType, sessionShortId);

  const captialize = words =>
    words
      .split(' ')
      .map(w => w.substring(0, 1).toUpperCase() + w.substring(1))
      .join(' ');

  return (
    <DetailsContent style={DetailsContentS}>
      <Title style={TitleS}>Connect 5 Session Details</Title>

      <Row style={RowS}>
        <Detail style={DetailS}>
          <BoldSpan style={BoldSpanS}>Session Type: </BoldSpan>
          {sessionType}
        </Detail>
      </Row>
      <Row style={RowS}>
        <Detail style={DetailS}>
          <BoldSpan style={BoldSpanS}>Date: </BoldSpan>
          {sessionDate}
        </Detail>
      </Row>
      <Row style={RowS}>
        <Detail style={DetailS}>
          <BoldSpan style={BoldSpanS}>Region: </BoldSpan>
          {captialize(sessionRegion)}
        </Detail>
      </Row>
      <Row style={RowS}>
        <Detail style={DetailS}>
          <BoldSpan style={BoldSpanS}>Location:</BoldSpan> {fullAddress}
        </Detail>
      </Row>
      <Row style={RowS}>
        <Detail style={DetailS}>
          <BoldSpan style={BoldSpanS}>Trainers: </BoldSpan>
          {sessionTrainers.map(el => (
            <div>
              <span>{captialize(el.name)} </span> ({el.email})
            </div>
          ))}
        </Detail>
      </Row>
      <Row style={RowS}>
        <Detail style={DetailS}>
          {getSessionSurveys(sessionType).map((survey, index) => (
            <div>
              <li style={{ listStyleType: 'none' }}>
                {' '}
                <BoldSpan style={BoldSpanS}>
                  {`${captialize(survey.split('-')[0])}-${captialize(
                    survey.split('-')[1]
                  )}-Survey`}
                  :{' '}
                </BoldSpan>
                {links[index]}
              </li>
            </div>
          ))}
        </Detail>
      </Row>
      <Row style={RowS}>
        <Detail style={DetailS}>
          <BoldSpan style={BoldSpanS}>
            Important information for course participants:{' '}
          </BoldSpan>
          <br></br>
          We kindly ask you to fill in required surveys. As soon as you&#39;ve
          submitted your first Connect 5 survey you will be able to log in using
          the Connect 5 App (www.c5.training). You can then donwload your
          certificate, view behavioural insights and course materials.
        </Detail>
      </Row>
    </DetailsContent>
  );
};
