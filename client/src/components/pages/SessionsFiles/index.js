/* eslint-disable react/destructuring-assignment */
// Pckages
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Collapse, Empty } from 'antd';

// Functions
import { fetchParticipantSessions } from '../../../actions/groupSessionsAction';

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
    this.props.fetchParticipantSessions({ PIN });
  }

  render() {
    const { sessions } = this.props;

    const completedSessions = sessions;
    return (
      <div>
        <Header type="home" userRole="participent" />

        <Wrapper>
          <Title>Completed sessions files</Title>
          <Collapse
            defaultActiveKey={Object.keys(materials)}
            expandIconPosition="right"
          >
            {completedSessions.length ? (
              completedSessions.map(
                session =>
                  materials[session.sessions.type].length > 0 && (
                    <Panel
                      header={`Session: ${uppercaseSurvey(
                        session.sessions.type
                      )}`}
                      key={session.sessions.type}
                    >
                      <ul
                        style={{
                          padding: '1rem',
                          width: '90%',
                          margin: '0 auto',
                        }}
                      >
                        {materials[session.sessions.type].map(resource => (
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
                  )
              )
            ) : (
              <Empty description="No Course Materials" />
            )}
          </Collapse>
        </Wrapper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  PIN: state.auth.PIN,
  sessions: state.sessions.participantSessions,
});

export default connect(
  mapStateToProps,
  { fetchParticipantSessions }
)(SessionsFiles);
