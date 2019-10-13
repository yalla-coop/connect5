const boom = require('boom');
const { exportData } = require('../../database/queries/feedback/exportData');

module.exports = async (req, res, next) => {
  const { filters = {} } = req.body;

  return exportData(filters)
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
              `${question.group.text}: ${subGroupText} ${question.text}`
            ] = answer.answer;
            return newResponseObj;
          });
        }

        // now answers assigned, remove answers array from obj
        delete newResponseObj.answers;

        return newResponseObj;
      });

      return res.json(cleanedResponses);
    })
    .catch(err => {
      next(boom.badImplementation('CSV data error'));
    });
};
