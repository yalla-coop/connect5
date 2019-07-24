// expects a boolean value for filter to decide what level of data to show
// if filter is true then it will run trainerFilter func on the overall data

const boom = require('boom');
const {
  exportData,
  trainerFilter,
} = require('../../database/queries/feedback/exportData');

module.exports = async (req, res, next) => {
  const { searchData } = req.body;
  const { filter, trainerIDs } = searchData;

  // const testResponses = await exportData()
  // console.log("test", testResponses)

  return exportData()
    .then(responses => {
      console.log('responses', responses);
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
        console.log('reached');
        const filteredResponses = trainerFilter(cleanedResponses, trainerIDs);
        if (filteredResponses.length === 0) {
          filteredResponses.push({ Data: 'No Responses Found' });
        }
        return res.json(filteredResponses);
      }
      console.log(cleanedResponses);
      return res.json(cleanedResponses);
    })
    .catch(err => next(boom.badImplementation('CSV data error')));
};