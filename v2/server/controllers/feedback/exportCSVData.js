// expects a boolean value for filter to decide what level of data to show
// if filter is true then it will run trainerFilter func on the overall data

const boom = require('boom');
const {
  exportData,
  trainerFilter,
} = require('../../database/queries/feedback/exportData');

module.exports = (req, res, next) => {
  const { searchData } = req.body;
  const { filter, trainerIDs } = searchData;

  return exportData()
    .then(responses => {
      // tidy responses to get all answers within the object
      const cleanedResponses = responses.map(response => {
        const newResponseObj = response;

        if (response.answers && response.answers.length > 0) {
          response.answers.map(answer => {
            const { question } = answer;
            let subGroupText = '';

            if (question.subGroup && question.subGroup.text) {
              subGroupText = question.subGroup.text;
            }

            newResponseObj[
              `${question.group}: ${subGroupText} ${question.text}`
            ] = answer.answer;
            return newResponseObj;
          });
        }

        // now answers assigned, remove answers array from obj
        delete newResponseObj.answers;

        return newResponseObj;
      });

      if (filter) {
        const filteredResponses = trainerFilter(cleanedResponses, trainerIDs);
        if (filteredResponses.length === 0) {
          filteredResponses.push({ Data: 'No Responses Found' });
        }
        return res.json(filteredResponses);
      }

      return res.json(cleanedResponses);
    })
    .catch(err => next(boom.badImplementation('CSV data error')));
};
