// controller to send the answers to the database
const boom = require('boom');
const validateSurveyInput = require('../../middlewares/validateSurveyInput');

const storeResponse = require('../../database/queries/surveys/storeResponse');
const { storeAnswers } = require('../../database/queries/surveys');
const { updateParticipant } = require('./../../database/queries/users');
const getStorableAnswers = require('./../../helpers/getAnswersFromForm');
const getParticipantDetails = require('./../../helpers/getParticipantDetails');

module.exports = async (req, res, next) => {
  try {
    const { errors, isValid } = await validateSurveyInput(req.body);

    const {
      PIN,
      sessionId,
      surveyType,
      formState,
      disagreedToResearch,
    } = req.body;

    let agreedToResearch = true;

    if (disagreedToResearch) {
      agreedToResearch = false;
    }

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // get the participant details from the answers
    const ParticipantDetailsFromSurvey = await getParticipantDetails(formState);

    // update participant data or create new participant if the PIN is new
    const storedParticipantDetails = await updateParticipant({
      PIN,
      ...ParticipantDetailsFromSurvey,
    });

    // storeResponse adds the response to the Response model
    // and returns the unique Response ID
    // storeAnswers adds all answers to the Answer model
    const response = await storeResponse(
      PIN,
      sessionId,
      surveyType,
      agreedToResearch,
      storedParticipantDetails._id
    );

    const storableAnswers = getStorableAnswers({
      responseId: response._id,
      answers: formState,
      sessionId,
      PIN,
      participantId: storedParticipantDetails._id,
    });
    await storeAnswers(storableAnswers);

    return res.status(200).json({});
  } catch (error) {
    return next(boom.badImplementation());
  }
};
