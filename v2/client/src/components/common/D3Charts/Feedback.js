import React, { Component } from 'react';
import CategorizedGroupChart from './CategorizedGroupChart';

class Feedback extends Component {
  render() {
    const { feedback, surveyList } = this.props;
    const feedbackArray = Object.values(feedback);

    return (
      <div style={{ padding: '25px' }}>
        {feedbackArray.map((question, i) => (
          <div key={question.text}>
            <p>{question.text}</p>
            <p>The red line indicates the average across all participants</p>

            <CategorizedGroupChart
              groups={Object.values(question.surveys)}
              i={`F-C-${i}`}
              legends={question.options}
              showRepliesCount
              surveyList={surveyList}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default Feedback;
