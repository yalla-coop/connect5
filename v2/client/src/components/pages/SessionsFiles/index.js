/* eslint-disable react/destructuring-assignment */
// Pckages
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Collapse } from 'antd';

// Functions
import { fetchParticipentSessions } from '../../../actions/groupSessionsAction';

// Components
import Header from '../../common/Header';
import { Wrapper, Title } from './SessionsFiles.style';

// Data
import materials from './materials';

const uppercaseSurvey = surveyType =>
  surveyType
    .split('-')
    .map(item => item[0].toLocaleUpperCase() + item.slice(1))
    .join(' ');

const { Panel } = Collapse;

class SessionsFiles extends Component {
  componentDidMount() {
    const { PIN } = this.props;
    this.props.fetchParticipentSessions(PIN);
  }

  render() {
    const { sessions } = this.props;
    const completedSessions = sessions.filter(session => session.completed);
    return (
      <div>
        <Header type="home" userRole="participent" />

        <Wrapper>
          <Title>Completed sessions files</Title>
          <Collapse
            defaultActiveKey={Object.keys(materials)}
            expandIconPosition="right"
          >
            {completedSessions.map(session => (
              <Panel
                header={`Session: ${uppercaseSurvey(session.sessions.type)}`}
                key={session.sessions.type}
              >
                <ul style={{ padding: '1rem', width: '90%', margin: '0 auto' }}>
                  {materials[session.sessions.type].length > 0 &&
                    materials[session.sessions.type].map(resource => (
                      <li>
                        <a
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {resource.displayName}
                        </a>
                      </li>
                    ))}
                </ul>
              </Panel>
            ))}
          </Collapse>
        </Wrapper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  PIN: state.auth.PIN,
  sessions: state.sessions.sessions,
});

export default connect(
  mapStateToProps,
  { fetchParticipentSessions }
)(SessionsFiles);
