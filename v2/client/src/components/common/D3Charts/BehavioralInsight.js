import React, { Component } from 'react';
import CategorizedGroupChart from './CategorizedGroupChart';
import NCategorizedGroupChart from './NCategorizedGroupChart';

class BehavioralInsight extends Component {
  render() {
    const { categorized, nonCategorized } = this.props;
    return (
      <div style={{ padding: '25px', margin: '0 auto' }}>
        {categorized.map((question, i) => (
          <>
            <p>{question.text}</p>
            <p>The red line indicates the average across all participants</p>
            <CategorizedGroupChart
              groups={question.surveys}
              i={`B-C-${i}`}
              legends={['Capability', 'Opportunity', 'Motivation']}
            />
          </>
        ))}

        {nonCategorized.map((question, i) => (
          <div style={{ margin: '0 auto' }}>
            <p>{question.text}</p>
            <NCategorizedGroupChart
              groups={question.surveys}
              i={`B-NC-${i}`}
              legends={['Capability', 'Opportunity', 'Motivation']}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default BehavioralInsight;
