import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getParticipantDemographic as getParticipantDemographicAction } from '../../../actions/demographics';
import Header from '../../common/Header';
import Toggle from '../../common/Toggle';
import BarChart from './BarChart';
import DoughnutChart from './DoughnutChart';
import Chart from './AdminSessions';

import {
  Wrapper,
  Title,
  BoldNumber,
  ChartWrapper,
  Legend,
} from './AdminDemographic.style';

class AdminDemographic extends Component {
  state = {
    toggle: 'left',
  };

  componentDidMount() {
    const { getParticipantDemographic } = this.props;
    getParticipantDemographic();
  }

  clickToggle = direction => {
    this.setState({ toggle: direction });
  };

  render() {
    const { toggle } = this.state;
    const { PDemographics } = this.props;
    const total = PDemographics.total && PDemographics.total[0].total;
    return (
      <Wrapper>
        <Header label="results" type="section" />
        <Chart />
        <Toggle
          selected={toggle}
          leftText="Participants"
          rightText="Sessions"
          large
          style={{ margin: '20px auto' }}
          onClick={this.clickToggle}
        />
        {toggle === 'left' ? (
          <>
            <Title>Participants</Title>
            <BoldNumber>{total}</BoldNumber>
            <Legend>Age: </Legend>
            <ChartWrapper>
              <BarChart rawData={PDemographics.age} total={total} />
            </ChartWrapper>
            <Legend>Gender: </Legend>
            <ChartWrapper>
              <DoughnutChart rawData={PDemographics.gender} total={total} />
            </ChartWrapper>
            <Legend>Ethnics: </Legend>
            <ChartWrapper>
              <BarChart rawData={PDemographics.ethnic} total={total} />
            </ChartWrapper>
            <Legend>Occupations: </Legend>
            <ChartWrapper>
              <BarChart rawData={PDemographics.occupation} total={total} />
            </ChartWrapper>
            <Legend>Regions: </Legend>
            <ChartWrapper>
              <BarChart rawData={PDemographics.region} total={total} />
            </ChartWrapper>
          </>
        ) : (
          <></>
        )}
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  PDemographics: state.demographics.participants,
});
export default connect(
  mapStateToProps,
  { getParticipantDemographic: getParticipantDemographicAction }
)(AdminDemographic);
