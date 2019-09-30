import React, { Component } from 'react';
import CategorizedGroupChart from './CategorizedGroupChart';
import NCategorizedGroupChart from './NCategorizedGroupChart';

class BehavioralInsight extends Component {
  render() {
    const { categorized, nonCategorized } = this.props;
    return (
      <div style={{ padding: '25px' }}>
        {categorized.map((question, i) => (
          <>
            <p>{question.text}</p>
            <CategorizedGroupChart
              groups={question.surveys}
              i={`B-C-${i}`}
              legends={['Capability', 'Opportunity', 'Motivation']}
            />
          </>
        ))}

        {nonCategorized.map((question, i) => (
          <>
            <p>{question.text}</p>
            <NCategorizedGroupChart
              groups={question.surveys}
              i={`B-NC-${i}`}
              legends={['Capability', 'Opportunity', 'Motivation']}
            />
          </>
        ))}
      </div>
    );
  }
}

export default BehavioralInsight;
