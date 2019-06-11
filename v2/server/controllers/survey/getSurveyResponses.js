const boom = require('boom');

const {
  getAllResponsesOnSurvey,
} = require('../../database/queries/surveys/surveyResponses');

const { getAttendeesNumber } = require('../../database/queries/surveys');

module.exports = async (req, res, next) => {
  const { sessionId, surveyType } = req.params;
  const promisesArray = [
    getAllResponsesOnSurvey(sessionId, surveyType),
    getAttendeesNumber(sessionId, surveyType),
  ];

  return Promise.all(promisesArray)
    .then(result => {
      const [responses, attendeesNumber] = result;
      res.json({
        responses,
        attendeesNumber: attendeesNumber.numberOfAttendees,
        responsesNumber: responses.length + 1,
      });
    })
    .catch(err => next(boom.badImplementation()));
};
