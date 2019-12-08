/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Drawer, Icon } from 'antd';
import Swal from 'sweetalert2';

// COMMON COMPONENTS
import Header from '../../common/Header';
import SessionList from './SessionsList';
import SessionTopDetails from '../SessionDetails/SessionTopDetails';

// ACTIONS
import { fetchParticipantSessions } from '../../../actions/groupSessionsAction';

// STYLING
import { Wrapper, Span, BackWrapper } from './ParticipantSessions.style';

import { getAllSurveyLinks, getSessionSurveys } from '../../../helpers';
import { readableSurveysNamePairs } from '../../../constants';

import { DrawerLink, CopyIcon } from '../SessionDetails/SessionDetails.Style';

import {
  SurveyLink,
  SurveyLinkWrapper,
  CopyLink,
} from '../SessionDetails/SessionSurveys/SessionSurveys.Style';

class ParticipantSessions extends Component {
  state = {
    visible: false,
    sessionIndex: 0,
  };

  componentDidMount() {
    const { email } = this.props;
    this.props.fetchParticipantSessions({ email });
  }

  onCopyClick = id => {
    const copyText = document.getElementById(id);
    let range;
    let selection;
    if (document.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText(copyText);
      range.select();
    } else if (window.getSelection) {
      selection = window.getSelection();
      range = document.createRange();
      range.selectNodeContents(copyText);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    try {
      document.execCommand('copy');
      Swal.fire({
        title: 'Success',
        text: 'Link copied!',
        type: 'success',
        timer: 2000,
        confirmButtonText: 'Ok',
      });
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: 'Unable to cop the Link',
        type: 'error',
        timer: 2000,
        confirmButtonText: 'Ok',
      });
    }
  };

  // open drawer
  handleDrawerOpen = e => {
    const { index } = e.target.dataset;

    this.setState({
      visible: true,
      sessionIndex: index,
    });
  };

  handleCloseDrawer = () => {
    this.setState({
      visible: false,
      sessionIndex: 0,
    });
  };

  render() {
    const { sessions } = this.props;
    const { visible, sessionIndex } = this.state;

    if (!sessions) {
      return <div>loading</div>;
    }
    let activeSession;
    let type;
    let shortId;
    let links = [];
    let surveys = [];
    if (sessions[sessionIndex]) {
      activeSession = sessions[sessionIndex];
      // eslint-disable-next-line prefer-destructuring
      type = activeSession.type;
      // eslint-disable-next-line prefer-destructuring
      shortId = activeSession.shortId;
      surveys = getSessionSurveys(type);
      links = getAllSurveyLinks(type, shortId);
    }

    return (
      <Wrapper>
        <Header type="home" userRole="participent" />
        <Span>
          Please chose the session you would like to access surveys for:
        </Span>
        <SessionList
          dataList={sessions}
          handleDrawerOpen={this.handleDrawerOpen}
        />
        <div
          style={{ width: '100%', position: 'absolute', left: 0 }}
          id="parentDiv"
        >
          <Drawer
            placement="left"
            width="100%"
            height="100%"
            onClose={this.handleCloseDrawer}
            visible={visible}
            closable
            bodyStyle={{ background: '#f7f8f9', minHeight: '100%' }}
            getContainer="#parentDiv"
            destroyOnClose
          >
            <>
              <BackWrapper onClick={this.handleCloseDrawer}>
                <Icon type="left" />
                <p
                  style={{
                    marginLeft: '1rem',
                    marginBottom: '0',
                  }}
                >
                  Back
                </p>
              </BackWrapper>

              <div style={{ background: '#fff' }}>
                {visible && (
                  <>
                    <SessionTopDetails
                      sessionDetails={sessions[sessionIndex]}
                    />
                    <div style={{ padding: '1rem' }}>
                      <DrawerLink>Registration Link</DrawerLink>
                      <SurveyLinkWrapper>
                        <SurveyLink
                          href={`${
                            process.env.NODE_ENV === 'production'
                              ? 'https://'
                              : 'http://'
                          }${window.location.host}/confirm/${
                            sessions[sessionIndex].shortId
                          }`}
                          target="_blank"
                          id="registration-link"
                          rel="noopener noreferrer"
                        >
                          {`${
                            process.env.NODE_ENV === 'production'
                              ? 'https://'
                              : 'http://'
                          }${window.location.host}/confirm/${
                            sessions[sessionIndex].shortId
                          }`}
                        </SurveyLink>
                        <CopyLink
                          onClick={() => this.onCopyClick('registration-link')}
                        >
                          <CopyIcon className="far fa-copy" />
                        </CopyLink>
                      </SurveyLinkWrapper>

                      <div>
                        {links.map((surveyURL, index) => (
                          <div style={{ paddingTop: '2rem' }}>
                            {readableSurveysNamePairs[surveys[index]]} Survey
                            <SurveyLinkWrapper>
                              <SurveyLink
                                href={surveyURL}
                                target="_blank"
                                rel="noopener noreferrer"
                                id={`link${index}`}
                              >
                                {surveyURL}
                              </SurveyLink>
                              <CopyLink
                                onClick={() => this.onCopyClick(`link${index}`)}
                              >
                                <CopyIcon className="far fa-copy"></CopyIcon>
                              </CopyLink>
                            </SurveyLinkWrapper>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          </Drawer>
        </div>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    loaded: state.auth.loaded,
    role: state.auth.role,
    email: state.auth.email,
    sessions: state.sessions.participantSessionsByEmail,
  };
};

export default connect(
  mapStateToProps,
  { fetchParticipantSessions }
)(ParticipantSessions);
