import React, { Component } from 'react';
import CategorizedGroupChart from './CategorizedGroupChart';

class Feedback extends Component {
  render() {
    const { feedback, surveyList, isTrainTrainersFeedback } = this.props;
    const feedbackArray = Object.values(feedback);
    return (
      <div style={{ padding: '25px' }}>
        {feedbackArray.map((question, i) => {
          const questionIncludesSurvey = surveyList
            ? question.surveys.some(item =>
                surveyList.includes(item.surveyType)
              )
            : true;
          if (!questionIncludesSurvey) return null;
          return (
            <div key={question.text}>
              <p>{question.text}</p>
              <p>The red line indicates the average across all participants</p>

              <CategorizedGroupChart
                groups={Object.values(question.surveys)}
                i={`F-C-${i}${isTrainTrainersFeedback ? 'TT' : 'TF'}`}
                legends={question.options}
                showRepliesCount
                surveyList={surveyList}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Feedback;
