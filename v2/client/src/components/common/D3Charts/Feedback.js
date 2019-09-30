import React, { Component } from 'react';
import CategorizedGroupChart from './CategorizedGroupChart';

class Feedback extends Component {
  render() {
    const { feedback } = this.props;
    const feedbackArray = Object.values(feedback);
    return (
      <div style={{ padding: '25px' }}>
        {feedbackArray.map((question, i) => (
          <>
            <p>{question.text}</p>
            <CategorizedGroupChart
              groups={Object.values(question.surveys)}
              i={`F-C-${i}`}
              legends={question.options}
            />
          </>
        ))}
      </div>
    );
  }
}

export default Feedback;
