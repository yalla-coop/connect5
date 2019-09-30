import React, { Component } from 'react';
import GroupChart from './GroupChart';

class BehaviralInsightChart extends Component {
  render() {
    const { categorized, nonCategorized } = this.props;
    return (
      <div style={{ padding: '25px' }}>
        {categorized.map((question, i) => (
          <>
            <p>{question.text}</p>
            <GroupChart
              groups={question.surveys}
              i={i}
              legends={['Capability', 'Opportunity', 'Motivation']}
            />
          </>
        ))}
      </div>
    );
  }
}

export default BehaviralInsightChart;
