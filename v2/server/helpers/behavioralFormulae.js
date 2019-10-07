const { checkAnswer } = require('./index');

/**
 * Oject with output formulae codes keys
 *    each key is a function that can be called with a response argument
 *    and reurn the calculated value after passing the response to the formulae
 */
const calculatedAnswersByCode = {
  FeedbackUserCapabilityB1: survey => {
    // (KnowB1+SkillB1)*5
    return (
      (checkAnswer(survey, 'KnowB1') + checkAnswer(survey, 'SkillB1')) * 10 ||
      null
    );
  },
  FeedbackUserOpportunityB1: survey => {
    // [(SocE1B1+SocE2B1+TimeB1)/3]*10
    return (
      (((checkAnswer(survey, 'SocE1B1') +
        checkAnswer(survey, 'SocE2B1') +
        checkAnswer(survey, 'TimeB1')) *
        2) /
        3) *
        10 || null
    );
  },
  FeedbackUserMotivationB1: survey => {
    // [(HabitB1+OutEB1+ConfB1+RoleB1)/2]*5
    return (
      (checkAnswer(survey, 'HabitB1') +
        checkAnswer(survey, 'OutEB1') +
        checkAnswer(survey, 'ConfB1') +
        checkAnswer(survey, 'RoleB1')) *
        5 || null
    );
  },
  FeedbackUserCapabilityB2: survey => {
    // (KnowB2+SkillB2)*5
    return (
      (checkAnswer(survey, 'KnowB2') + checkAnswer(survey, 'SkillB2')) * 10 ||
      null
    );
  },
  FeedbackUserOpportunityB2: survey => {
    // [(SocE1B2+SocE2B2+TimeB2)/3]*10
    return (
      (((checkAnswer(survey, 'SocE1B2') +
        checkAnswer(survey, 'SocE2B2') +
        checkAnswer(survey, 'TimeB2')) *
        2) /
        3) *
        10 || null
    );
  },
  FeedbackUserMotivationB2: survey => {
    // [(HabitB2+OutEB2+ConfB2+RoleB2)/2]*5
    return (
      (checkAnswer(survey, 'HabitB2') +
        checkAnswer(survey, 'OutEB2') +
        checkAnswer(survey, 'ConfB2') +
        checkAnswer(survey, 'RoleB2')) *
        5 || null
    );
  },
  FeedbackUserCapabilityB3: survey => {
    // (KnowB3+SkillB3)*5
    return (
      (checkAnswer(survey, 'KnowB3') + checkAnswer(survey, 'SkillB3')) * 10 ||
      null
    );
  },
  FeedbackUserOpportunityB3: survey => {
    // [(SocE1B3+SocE2B3+TimeB3)/3]*10
    return (
      (((checkAnswer(survey, 'SocE1B3') +
        checkAnswer(survey, 'SocE2B3') +
        checkAnswer(survey, 'TimeB3')) *
        2) /
        3) *
        10 || null
    );
  },
  FeedbackUserMotivationB3: survey => {
    // [(HabitB3+OutEB3+ConfB3+RoleB3)/2]*5
    return (
      (checkAnswer(survey, 'HabitB3') +
        checkAnswer(survey, 'OutEB3') +
        checkAnswer(survey, 'ConfB3') +
        checkAnswer(survey, 'RoleB3')) *
        5 || null
    );
  },
  // for "in last week"
  FeedbackUserB1: survey => {
    // (B1/People)*100
    return (
      (checkAnswer(survey, 'B1') / checkAnswer(survey, 'People')) * 100 || null
    );
  },
  FeedbackUserB2: survey => {
    // (B2/People)*100
    return (
      (checkAnswer(survey, 'B2') / checkAnswer(survey, 'People')) * 100 || null
    );
  },
  FeedbackUserB3: survey => {
    // (B3/People)*100
    return (
      (checkAnswer(survey, 'B3') / checkAnswer(survey, 'People')) * 100 || null
    );
  },
};

module.exports = calculatedAnswersByCode;
