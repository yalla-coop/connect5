import React from 'react';
import { SurveyResult } from './SessionSurveys.Style';

const SurveyResultLink = ({ id, type }) => {
  return (
    <SurveyResult to={`/survey/${id}/${type}/results`}>
      Survey Results
    </SurveyResult>
  );
};

export default SurveyResultLink;
