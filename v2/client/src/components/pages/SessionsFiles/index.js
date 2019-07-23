/* eslint-disable react/destructuring-assignment */
// Pckages
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SessionList from '../../common/List/SessionList';

// Functions
import { fetchParticipentSessions } from '../../../actions/groupSessionsAction';

// Components
import Header from '../../common/Header';
import { Wrapper, Title } from './SessionsFiles.style';

const materials = {
  1: 'https://drive.google.com/drive/folders/18NJclc2zBvotc1q_Hy0gFLjBM1ThvbHN?usp=sharing',
  2: 'https://drive.google.com/drive/folders/1lMbrWOlnv50n22_lepJ7FQqMw4Rqw5g0?usp=sharing',
  3: 'https://drive.google.com/drive/folders/1uR9iBD20vN2U-hzUulCEzaTipJYs6yIe?usp=sharing',
  'special-2-days':
    'https://drive.google.com/drive/folders/1nifonoZ-bQyEnuoxg3-AVESLh6wgEAMe?usp=sharing',
  'train-trainers':
    'https://drive.google.com/open?id=1oopFc6Yy2ZfValQAxRZKn-m6PrOE7c7J',
};

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
        <Header label="Materials" type="section" />
        <Wrapper>
          <Title>Completed sessions files</Title>
          <SessionList
            dataList={completedSessions.map(item => ({
              ...item,
              type: item.sessions.type,
              link: materials[item.sessions.type],
              blank: true,
              asLink: true,
              linkText: 'View/Download',
            }))}
          />
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
