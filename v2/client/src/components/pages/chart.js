import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchSessionsPerRegions } from '../../actions/allSessionsAction';

export const ContentWrapper = styled.div`
  max-width: 25rem;
  margin: 0 auto;
  padding: 5rem 15px;
`;

class Chart extends Component {
  state = {
    chartData: {},
  };

  defaultProps = {
    displayTitle: true,
    displayLegand: true,
    legandPosition: 'right',
  };

  componentDidMount() {
    const {
      fetchSessionsPerRegions: sessionsPerRegionsAction,
      data,
      loaded,
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
    });
  };

  render() {
    const { chartData } = this.state;
    const { displayTitle, displayLegand } = this.props;
    return (
      <ContentWrapper>
        <Bar
          data={chartData}
          width={320}
          height={251}
          options={{
            title: {
              display: displayTitle,
              text: 'largest cities',
              fontSize: 25,
            },
            legand: {
              display: displayLegand,
              position: 'bottom',
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
              xAxes: [
                {
                  barPercentage: 0.5,
                  barThickness: 12.8,
                  maxBarThickness: 20,
                  minBarLength: 2,
                },
              ],
            },
            layout: {
              padding: {
                left: 10,
                right: 0,
                top: 0,
                bottom: 0,
              },
            },
          }}
        />
      </ContentWrapper>
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
