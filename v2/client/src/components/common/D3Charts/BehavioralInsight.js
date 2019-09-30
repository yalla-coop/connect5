import React, { Component } from 'react';
import CategorizedGroupChart from './CategorizedGroupChart';
import NCategorizedGroupChart from './NCategorizedGroupChart';

class BehaviralInsightChart extends Component {
  render() {
    const { categorized, nonCategorized } = this.props;
    return (
      <div style={{ padding: '25px' }}>
        {categorized.map((question, i) => (
          <>
            <p>{question.text}</p>
            <CategorizedGroupChart
              groups={question.surveys}
              i={i}
              legends={['Capability', 'Opportunity', 'Motivation']}
            />
          </>
        ))}

        {nonCategorized.map((question, i) => (
          <>
            {console.log(question)}
            <p>{question.text}</p>
            <NCategorizedGroupChart
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
