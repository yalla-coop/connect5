import React, { Component } from 'react';
import CategorizedGroupChart from './CategorizedGroupChart';
import NCategorizedGroupChart from './NCategorizedGroupChart';

class BehavioralInsight extends Component {
  isQeustionIncludesTheSurveyList = question => {
    const { surveyList } = this.props;
    return (
      question.surveys.filter(item =>
        surveyList ? surveyList.includes(item.surveyType) : true
      ).length > 0
    );
  };

  getSurveysFromList = surveys => {
    const { surveyList } = this.props;

    return surveys.filter(item =>
      surveyList ? surveyList.includes(item.surveyType) : true
    );
  };

  render() {
    const { categorized, nonCategorized, surveyList } = this.props;

    return (
      <div style={{ padding: '25px', margin: '0 auto' }}>
        {categorized.map((question, i) => (
          <>
            {this.isQeustionIncludesTheSurveyList(question) && (
              <>
                <p>{question.text}</p>
                <p>
                  The red line indicates the average across all participants
                </p>
                <CategorizedGroupChart
                  groups={this.getSurveysFromList(question.surveys)}
                  i={`B-C-${i}`}
                  legends={['Capability', 'Opportunity', 'Motivation']}
                  surveyList={surveyList}
                />
              </>
            )}
          </>
        ))}

        {nonCategorized.map((question, i) => (
          <div style={{ margin: '0 auto' }}>
            {this.isQeustionIncludesTheSurveyList(question) && (
              <>
                <p>{question.text}</p>
                <NCategorizedGroupChart
                  groups={this.getSurveysFromList(question.surveys)}
                  i={`B-NC-${i}`}
                  legends={['Capability', 'Opportunity', 'Motivation']}
                />
              </>
            )}
          </div>
        ))}
      </div>
    );
  }
}

export default BehavioralInsight;
