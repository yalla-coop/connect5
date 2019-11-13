import React, { Component } from 'react';

import { Button } from 'antd';
import { getAllSurveyLinks, getSessionSurveys } from '../../../helpers';
import Header from '../../common/Header';
import Spin from '../../common/Spin';
import history from '../../../history';

// STYLING
import {
  Wrapper,
  DetailsContent,
  Detail,
  BoldSpan,
  Row,
  BackContainer,
  BackLink,
  Title,
} from './PrintSessionDetails.style';

export default class PrintSessionDetails extends Component {
  render() {
    const {
      location: {
        state: { details },
      },
    } = this.props;

    if (!details) {
      return <Spin />;
    }
    const {
      sessionDate,
      sessionRegion,
      sessionShortId,
      sessionTrainers,
      sessionType,
      address,
    } = details;

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
      <Wrapper>
        <Header type="section" label="Connect 5 Session Details" />
        <BackContainer>
          <BackLink onClick={history.goBack}>{`< Back`}</BackLink>
        </BackContainer>
        <DetailsContent>
          <Title>Connect 5 Session Details</Title>

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
              {captialize(sessionRegion)}
            </Detail>
          </Row>
          <Row>
            <Detail>
              <BoldSpan>Location:</BoldSpan> {fullAddress}
            </Detail>
          </Row>
          <Row>
            <Detail>
              <BoldSpan>Trainers: </BoldSpan>
              {sessionTrainers.map(el => (
                <div>
                  <span>{captialize(el.name)} </span> ({el.email})
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
          <Row>
            <Detail>
              <BoldSpan>
                Important information for course participants:{' '}
              </BoldSpan>
              <br></br>
              We kindly ask you to fill in required surveys. As soon as you've
              submitted your first Connect 5 survey you will be able to log in
              using the Connect 5 App (www.c5.training). You can then donwload
              your certificate, view behavioural insights and course materials.
            </Detail>
          </Row>
        </DetailsContent>
        <div>
          <Button onClick={() => window.print()}>PRINT</Button>
        </div>
      </Wrapper>
    );
  }
}
