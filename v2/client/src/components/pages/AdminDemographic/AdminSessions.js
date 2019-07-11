import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSessionsPerRegions } from '../../../actions/allSessionsAction';
import BarChart from '../../common/BarChart';

class Chart extends Component {
  state = {
    chartData: {},
    maxNumber: '',
  };

  componentDidMount() {
    const {
      fetchSessionsPerRegions: sessionsPerRegionsAction,
      data,
    } = this.props;
    sessionsPerRegionsAction();
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
    return (
      <BarChart
        data={chartData}
        width={320}
        height={251}
        maxNumber={maxNumber}
      />
    );
  }
}

const mapStateToProps = state => ({
  data: state.sessions.sessions,
  loaded: state.sessions.loaded,
});

export default connect(
  mapStateToProps,
  { fetchSessionsPerRegions }
)(Chart);
