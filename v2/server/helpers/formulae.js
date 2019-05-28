/* eslint-disable no-lonely-if */
/* eslint-disable no-restricted-globals */
/* eslint-disable dot-notation */
module.exports = (answers, surveyTitle) => {
  return [
    {
      text:
        'You suggested to people who needed it,  ways they could take action on their own mental health or wellbeing',
      formulae: (answers.B1 / answers.People) * 100,
      survey: surveyTitle,
    },
    {
      text:
        'You had a conversation with people who needed it,  in which you developed a shared understanding of their mental health and wellbeing needs',
      formulae: (answers.B2 / answers.People) * 100,
      survey: surveyTitle,
    },
    {
      text:
        'You used appropriate conversational methods to empower people who needed it, to make a change that addresses their mental health and wellbeing needs',
      formulae: (answers.B3 / answers.People) * 100,
      survey: surveyTitle,
    },
    {
      text:
        'When you think about suggesting to people ways in which they could take action on their own mental health or wellbeing, you perceive your capability to be',
      formulae: (answers.KnowB1 + answers.SkillB1) * 50,
      survey: surveyTitle,
    },
    {
      text:
        'When you think about suggesting to people ways in which they could take action on their own mental health or wellbeing, you perceive your opportunity to be',
      formulae: ((answers.SocE1B1 + answers.SocE2B1 + answers.TimeB1) / 3) * 10,
      survey: surveyTitle,
    },
    {
      text:
        'When you think about suggesting to people ways in which they could take action on their own mental health or wellbeing, you perceive your motivation to be',
      formulae:
        ((answers.HabitB1 + answers.OutEB1 + answers.ConfB1 + answers.RoleB1) /
          2) *
        5,
      survey: surveyTitle,
    },

    {
      text:
        'When you think about having a conversation with people in which you develop a shared understanding of their mental health and wellbeing needs, you perceive your capability to be',
      formulae: (answers.KnowB2 + answers.SkillB2) * 50,
      survey: surveyTitle,
    },
    {
      text:
        'When you think about having a conversation with people in which you develop a shared understanding of their mental health and wellbeing needs, you perceive your opportunity to be',
      formulae: ((answers.SocE1B2 + answers.SocE2B2, answers.TimeB2) / 3) * 10,
      survey: surveyTitle,
    },
    {
      text:
        'When you think about having a conversation with people in which you develop a shared understanding of their mental health and wellbeing needs, you perceive your motivation to be',
      formulae:
        ((answers.HabitB2 + answers.OutEB2 + answers.ConfB2 + answers.RoleB2) /
          2) *
        5,
      survey: surveyTitle,
    },
    {
      text:
        'When you think about using appropriate conversational methods to empower poeple to make a change that addresses their mental health and wellbeing needs, you perceive your capability to be',
      formulae: (answers.KnowB3 + answers.SkillB3) * 50,
      survey: surveyTitle,
    },
    {
      text:
        'When you think about using appropriate conversational methods to empower poeple to make a change that addresses their mental health and wellbeing needs, you perceive your opportunity to be',
      formulae: ((answers.SocE1B3 + answers.SocE2B3 + answers.TimeB3) / 3) * 10,
      survey: surveyTitle,
    },
    {
      text:
        'When you think about using appropriate conversational methods to empower poeple to make a change that addresses their mental health and wellbeing needs, you perceive your motivation to be',
      formulae:
        ((answers.HabitB3 + answers.OutEB3 + answers.ConfB3 + answers.RoleB3) /
          2) *
        5,
      survey: surveyTitle,
    },
  ];
};
