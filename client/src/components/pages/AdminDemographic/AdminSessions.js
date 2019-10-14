import React, { Component } from 'react';
import { connect } from 'react-redux';
import BarChart from '../../common/BarChart';
import { fetchSessionsPerRegions } from '../../../actions/adminSessionsAction';
import { fetchALLSessions } from '../../../actions/groupSessionsAction';
import {
  AdminSessionsWrapper,
  TopInfo,
  TotalSessions,
  SessionsNum,
  Legend,
} from './AdminDemographic.style';

class AdminSessions extends Component {
  state = {
    chartData: {},
    maxNumber: '',
  };

  componentDidMount() {
    const {
      fetchSessionsPerRegions: sessionsPerRegionsActionCreator,
      fetchALLSessions: fetchALLSessionsActionCreator,
      data,
    } = this.props;
    sessionsPerRegionsActionCreator();
    fetchALLSessionsActionCreator();
    if (data && data) {
      this.getChartData(data);
    }
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (data !== prevProps.data) {
      this.getChartData(data);
    }
  }

  getChartData = data => {
    const maxNumber = Math.max(...data.map(item => item.session));
    this.setState({
      chartData: {
        labels: data.map(dataSet => {
          return dataSet._id;
        }),
        datasets: [
          {
            label: 'Sessions Per Regions',
            data: data.map(dataSet => {
              return dataSet.session;
            }),
            backgroundColor: '#9ADBF9',
            borderWidth: 1,
            dataPointWidth: 20,
            hoverBackgroundColor: '#36BEFC',
            hoverBorderColor: '#36BEFC',
          },
        ],
      },
      maxNumber,
    });
  };

  render() {
    const { chartData, maxNumber } = this.state;
    const { sessions } = this.props;
    return (
      <AdminSessionsWrapper>
        <TopInfo>
          <TotalSessions>Total Sessions</TotalSessions>
          <SessionsNum>{sessions && sessions.length}</SessionsNum>
        </TopInfo>
        <Legend>Regions</Legend>
        <BarChart
          data={chartData}
          width={320}
          height={251}
          maxNumber={maxNumber}
        />
      </AdminSessionsWrapper>
    );
  }
}

const mapStateToProps = state => ({
  data: state.adminSessions.sessions,
  sessions: state.sessions.sessions,
});

export default connect(
  mapStateToProps,
  { fetchSessionsPerRegions, fetchALLSessions }
)(AdminSessions);
