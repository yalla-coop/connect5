const Response = require('./../../models/Response');
const Question = require('./../../models/Question');
const Answer = require('./../../models/Answer');

module.exports = async () => {
  const firstResponseOnPreDay1 = await Response.findOne({ PIN: 'HIO13' });
  const secondResponseOnPreDay1 = await Response.findOne({ PIN: 'RAM14' });

  const firstResponseDay1 = await Response.findOne({ PIN: 'RAM15' });
  const secondResponseDay1 = await Response.findOne({ PIN: 'RAM16' });
  const firstResponseDay2 = await Response.findOne({ PIN: 'RAM17' });
  const trainTheTrainersResponses = await Response.find({
    surveyType: 'pre-train-trainers',
  });
  const preTrainTrainerQuestions = await Question.find({
    surveyType: 'pre-train-the-trainer',
  });

  const preDay1Question = await Question.find({ surveyType: 'pre-day-1' });
  const postDay1Question = await Question.find({ surveyType: 'post-day-1' });
  const postDay2Question = await Question.find({ surveyType: 'post-day-2' });

  const options = ['not at all', 'a little', 'a lot', "I'm not sure"];

  const answers = [
    // DEMOGRAPHIC
    {
      question: preDay1Question[0],

      PIN: 'HIO13',
      response: firstResponseOnPreDay1,
      answer: '18-24 years old',
    },
    {
      question: preDay1Question[1],

      PIN: 'HIO13',
      response: firstResponseOnPreDay1,
      answer: 'Male',
    },
    {
      question: preDay1Question[2],

      PIN: 'HIO13',
      response: firstResponseOnPreDay1,
      answer: 'White and Black Caribbean',
    },
    {
      question: preDay1Question[3],

      PIN: 'HIO13',
      response: firstResponseOnPreDay1,
      answer: 'North East',
    },
    {
      question: preDay1Question[4],

      PIN: 'HIO13',
      response: firstResponseOnPreDay1,
      answer: '00441',
    },
    {
      question: preDay1Question[5],

      PIN: 'HIO13',
      response: firstResponseOnPreDay1,
      answer: '2019-05-15',
    },
    {
      question: preDay1Question[6],

      PIN: 'HIO13',
      response: firstResponseOnPreDay1,
      answer: 'nurse',
    },
    {
      question: preDay1Question[7],

      PIN: 'HIO13',
      response: firstResponseOnPreDay1,
      answer:
        'Health Professionals (e.g. GPs, nurses, Allied Health Professionals)',
    },
    // behavioural1
    {
      question: preDay1Question[8],

      PIN: 'HIO13',
      response: firstResponseOnPreDay1,
      answer: 10,
    },
    {
      question: preDay1Question[9],

      PIN: 'HIO13',
      response: firstResponseOnPreDay1,
      answer: 5,
    },
    {
      question: preDay1Question[10],
      PIN: 'HIO13',
      response: firstResponseOnPreDay1,
      answer: 4,
    },
    {
      question: preDay1Question[11],
      PIN: 'HIO13',
      response: firstResponseOnPreDay1,
      answer: 3,
    },
    // behavioural2
    {
      question: preDay1Question[12],
      PIN: 'HIO13',
      response: firstResponseOnPreDay1,
      answer: 3,
    },
    {
      question: preDay1Question[13],
      PIN: 'HIO13',
      response: firstResponseOnPreDay1,
      answer: 8,
    },
    {
      question: preDay1Question[14],
      PIN: 'HIO13',
      response: firstResponseOnPreDay1,
      answer: 7,
    },
    // behavioural3
    {
      question: preDay1Question[15],
      PIN: 'HIO13',
      response: firstResponseOnPreDay1,
      answer: 9,
    },
    {
      question: preDay1Question[16],
      PIN: 'HIO13',
      response: firstResponseOnPreDay1,
      answer: 4,
    },
    {
      question: preDay1Question[17],
      PIN: 'HIO13',
      response: firstResponseOnPreDay1,
      answer: 5,
    },
    {
      question: preDay1Question[18],
      PIN: 'HIO13',
      response: firstResponseOnPreDay1,
      answer: 8,
    },
    {
      question: preDay1Question[19],
      PIN: 'HIO13',
      response: firstResponseOnPreDay1,
      answer: 4,
    },
    {
      question: preDay1Question[20],
      PIN: 'HIO13',
      response: firstResponseOnPreDay1,
      answer: 9,
    },
    {
      question: preDay1Question[21],
      PIN: 'HIO13',
      response: firstResponseOnPreDay1,
      answer: 10,
    },
    {
      question: preDay1Question[22],
      PIN: 'HIO13',
      response: firstResponseOnPreDay1,
      answer: 8,
    },
    {
      question: preDay1Question[23],
      PIN: 'HIO13',
      response: firstResponseOnPreDay1,
      answer: 7,
    },
    // behavioural4
    {
      question: preDay1Question[24],
      PIN: 'HIO13',
      response: firstResponseOnPreDay1,
      answer: 5,
    },
    {
      question: preDay1Question[25],
      PIN: 'HIO13',
      response: firstResponseOnPreDay1,
      answer: 9,
    },
    {
      question: preDay1Question[26],
      PIN: 'HIO13',
      response: firstResponseOnPreDay1,
      answer: 4,
    },
    {
      question: preDay1Question[27],
      PIN: 'HIO13',
      response: firstResponseOnPreDay1,
      answer: 3,
    },
    {
      question: preDay1Question[28],
      PIN: 'HIO13',
      response: firstResponseOnPreDay1,
      answer: 9,
    },
    {
      question: preDay1Question[29],
      PIN: 'HIO13',
      response: firstResponseOnPreDay1,
      answer: 10,
    },
    {
      question: preDay1Question[30],
      PIN: 'HIO13',
      response: firstResponseOnPreDay1,
      answer: 5,
    },
    {
      question: preDay1Question[31],
      PIN: 'HIO13',
      response: firstResponseOnPreDay1,
      answer: 8,
    },
    {
      question: preDay1Question[32],
      PIN: 'HIO13',
      response: firstResponseOnPreDay1,
      answer: 7,
    },
    // behavioural5
    {
      question: preDay1Question[33],
      PIN: 'HIO13',
      response: firstResponseOnPreDay1,
      answer: 5,
    },
    {
      question: preDay1Question[34],
      PIN: 'HIO13',
      response: firstResponseOnPreDay1,
      answer: 9,
    },
    {
      question: preDay1Question[35],
      PIN: 'HIO13',
      response: firstResponseOnPreDay1,
      answer: 4,
    },
    {
      question: preDay1Question[36],
      PIN: 'HIO13',
      response: firstResponseOnPreDay1,
      answer: 3,
    },
    {
      question: preDay1Question[37],
      PIN: 'HIO13',
      response: firstResponseOnPreDay1,
      answer: 9,
    },
    {
      question: preDay1Question[38],
      PIN: 'HIO13',
      response: firstResponseOnPreDay1,
      answer: 10,
    },
    {
      question: preDay1Question[39],
      PIN: 'HIO13',
      response: firstResponseOnPreDay1,
      answer: 5,
    },
    {
      question: preDay1Question[40],
      PIN: 'HIO13',
      response: firstResponseOnPreDay1,
      answer: 8,
    },
    {
      question: preDay1Question[41],
      PIN: 'HIO13',
      response: firstResponseOnPreDay1,
      answer: 7,
    },
    // Second response
    // DEMOGRAPHIC
    {
      question: preDay1Question[0],
      response: secondResponseOnPreDay1,
      PIN: 'RAM14',
      answer: '35-44 years old',
    },
    {
      question: preDay1Question[1],
      response: secondResponseOnPreDay1,
      PIN: 'RAM14',
      answer: 'female',
    },
    {
      question: preDay1Question[2],
      response: secondResponseOnPreDay1,
      PIN: 'RAM14',
      answer: 'English/Welsh/Scottish/Northern Irish/British',
    },
    {
      question: preDay1Question[3],
      response: secondResponseOnPreDay1,
      PIN: 'RAM14',
      answer: 'East Midlands',
    },
    {
      question: preDay1Question[4],
      response: secondResponseOnPreDay1,
      PIN: 'RAM14',
      answer: '5514',
    },
    {
      question: preDay1Question[5],
      response: secondResponseOnPreDay1,
      PIN: 'RAM14',
      answer: '2019-05-15',
    },
    {
      question: preDay1Question[6],
      response: secondResponseOnPreDay1,
      PIN: 'RAM14',
      answer: 'policeman',
    },
    {
      question: preDay1Question[7],
      response: secondResponseOnPreDay1,
      PIN: 'RAM14',
      answer: 'Emergency services (including fire service, police, ambulance)',
    },
    // behavioural1
    {
      question: preDay1Question[8],
      response: secondResponseOnPreDay1,
      PIN: 'RAM14',
      answer: 10,
    },
    {
      question: preDay1Question[9],
      response: secondResponseOnPreDay1,
      PIN: 'RAM14',
      answer: 5,
    },
    {
      question: preDay1Question[10],
      response: secondResponseOnPreDay1,
      PIN: 'RAM14',
      answer: 4,
    },
    {
      question: preDay1Question[11],
      response: secondResponseOnPreDay1,
      PIN: 'RAM14',
      answer: 3,
    },
    // behavioural2
    {
      question: preDay1Question[12],
      response: secondResponseOnPreDay1,
      PIN: 'RAM14',
      answer: 3,
    },
    {
      question: preDay1Question[13],
      response: secondResponseOnPreDay1,
      PIN: 'RAM14',
      answer: 8,
    },
    {
      question: preDay1Question[14],
      response: secondResponseOnPreDay1,
      PIN: 'RAM14',
      answer: 7,
    },
    // behavioural3
    {
      question: preDay1Question[15],
      response: secondResponseOnPreDay1,
      PIN: 'RAM14',
      answer: 9,
    },
    {
      question: preDay1Question[16],
      response: secondResponseOnPreDay1,
      PIN: 'RAM14',
      answer: 4,
    },
    {
      question: preDay1Question[17],
      response: secondResponseOnPreDay1,
      PIN: 'RAM14',
      answer: 5,
    },
    {
      question: preDay1Question[18],
      response: secondResponseOnPreDay1,
      PIN: 'RAM14',
      answer: 8,
    },
    {
      question: preDay1Question[19],
      response: secondResponseOnPreDay1,
      PIN: 'RAM14',
      answer: 4,
    },
    {
      question: preDay1Question[20],
      response: secondResponseOnPreDay1,
      PIN: 'RAM14',
      answer: 9,
    },
    {
      question: preDay1Question[21],
      response: secondResponseOnPreDay1,
      PIN: 'RAM14',
      answer: 10,
    },
    {
      question: preDay1Question[22],
      response: secondResponseOnPreDay1,
      PIN: 'RAM14',
      answer: 8,
    },
    {
      question: preDay1Question[23],
      response: secondResponseOnPreDay1,
      PIN: 'RAM14',
      answer: 7,
    },
    // behavioural4
    {
      question: preDay1Question[24],
      response: secondResponseOnPreDay1,
      PIN: 'RAM14',
      answer: 6,
    },
    {
      question: preDay1Question[25],
      response: secondResponseOnPreDay1,
      PIN: 'RAM14',
      answer: 10,
    },
    {
      question: preDay1Question[26],
      response: secondResponseOnPreDay1,
      PIN: 'RAM14',
      answer: 3,
    },
    {
      question: preDay1Question[27],
      response: secondResponseOnPreDay1,
      PIN: 'RAM14',
      answer: 3,
    },
    {
      question: preDay1Question[28],
      response: secondResponseOnPreDay1,
      PIN: 'RAM14',
      answer: 8,
    },
    {
      question: preDay1Question[29],
      response: secondResponseOnPreDay1,
      PIN: 'RAM14',
      answer: 10,
    },
    {
      question: preDay1Question[30],
      response: secondResponseOnPreDay1,
      PIN: 'RAM14',
      answer: 9,
    },
    {
      question: preDay1Question[31],
      response: secondResponseOnPreDay1,
      PIN: 'RAM14',
      answer: 4,
    },
    {
      question: preDay1Question[32],
      response: secondResponseOnPreDay1,
      PIN: 'RAM14',
      answer: 1,
    },
    // behavioural5
    {
      question: preDay1Question[33],
      response: secondResponseOnPreDay1,
      PIN: 'RAM14',
      answer: 4,
    },
    {
      question: preDay1Question[34],
      response: secondResponseOnPreDay1,
      PIN: 'RAM14',
      answer: 9,
    },
    {
      question: preDay1Question[35],
      response: secondResponseOnPreDay1,
      PIN: 'RAM14',
      answer: 10,
    },
    {
      question: preDay1Question[36],
      response: secondResponseOnPreDay1,
      PIN: 'RAM14',
      answer: 10,
    },
    {
      question: preDay1Question[37],
      response: secondResponseOnPreDay1,
      PIN: 'RAM14',
      answer: 8,
    },
    {
      question: preDay1Question[38],
      response: secondResponseOnPreDay1,
      PIN: 'RAM14',
      answer: 5,
    },
    {
      question: preDay1Question[39],
      response: secondResponseOnPreDay1,
      PIN: 'RAM14',
      answer: 5,
    },
    {
      question: preDay1Question[40],
      response: secondResponseOnPreDay1,
      PIN: 'RAM14',
      answer: 9,
    },
    {
      question: preDay1Question[41],
      response: secondResponseOnPreDay1,
      PIN: 'RAM14',
      answer: 6,
    },
    // post session 1 no 1
    // behavioural 2,3
    {
      question: postDay1Question[0],
      response: firstResponseDay1,
      PIN: 'RAM15',
      answer: 6,
    },
    {
      question: postDay1Question[1],
      response: firstResponseDay1,
      PIN: 'RAM15',
      answer: 6,
    },
    {
      question: postDay1Question[2],
      response: firstResponseDay1,
      PIN: 'RAM15',
      answer: 6,
    },
    {
      question: postDay1Question[3],
      response: firstResponseDay1,
      PIN: 'RAM15',
      answer: 6,
    },
    {
      question: postDay1Question[4],
      response: firstResponseDay1,
      PIN: 'RAM15',
      answer: 6,
    },
    {
      question: postDay1Question[5],
      response: firstResponseDay1,
      PIN: 'RAM15',
      answer: 6,
    },
    {
      question: postDay1Question[6],
      response: firstResponseDay1,
      PIN: 'RAM15',
      answer: 6,
    },
    {
      question: postDay1Question[7],
      response: firstResponseDay1,
      PIN: 'RAM15',
      answer: 6,
    },
    {
      question: postDay1Question[8],
      response: firstResponseDay1,
      PIN: 'RAM15',
      answer: 6,
    },
    {
      question: postDay1Question[9],
      response: firstResponseDay1,
      PIN: 'RAM15',
      answer: 6,
    },
    {
      question: postDay1Question[10],
      response: firstResponseDay1,
      PIN: 'RAM15',
      answer: 6,
    },
    {
      question: postDay1Question[11],
      response: firstResponseDay1,
      PIN: 'RAM15',
      answer: 6,
    },
    {
      question: postDay1Question[12],
      response: firstResponseDay1,
      PIN: 'RAM15',
      answer: 7,
    },
    // your trainer 1
    {
      question: postDay1Question[13],
      response: firstResponseDay1,
      PIN: 'RAM15',
      answer: options[0],
    },
    {
      question: postDay1Question[14],
      response: firstResponseDay1,
      PIN: 'RAM15',
      answer: options[1],
    },
    {
      question: postDay1Question[15],
      response: firstResponseDay1,
      PIN: 'RAM15',
      answer: options[3],
    },
    {
      question: postDay1Question[16],
      response: firstResponseDay1,
      PIN: 'RAM15',
      answer: options[2],
    },
    {
      question: postDay1Question[17],
      response: firstResponseDay1,
      PIN: 'RAM15',
      answer: options[2],
    },
    {
      question: postDay1Question[18],
      response: firstResponseDay1,
      PIN: 'RAM15',
      answer: options[1],
    },
    // your trainer 2
    {
      question: postDay1Question[19],
      response: firstResponseDay1,
      PIN: 'RAM15',
      answer: options[2],
    },
    {
      question: postDay1Question[20],
      response: firstResponseDay1,
      PIN: 'RAM15',
      answer: options[2],
    },
    {
      question: postDay1Question[21],
      response: firstResponseDay1,
      PIN: 'RAM15',
      answer: options[2],
    },
    {
      question: postDay1Question[22],
      response: firstResponseDay1,
      PIN: 'RAM15',
      answer: options[1],
    },
    {
      question: postDay1Question[23],
      response: firstResponseDay1,
      PIN: 'RAM15',
      answer: options[0],
    },
    {
      question: postDay1Question[24],
      response: firstResponseDay1,
      PIN: 'RAM15',
      answer: options[2],
    },
    {
      question: postDay1Question[25],
      response: firstResponseDay1,
      PIN: 'RAM15',
      answer: options[1],
    },
    {
      question: postDay1Question[26],
      response: firstResponseDay1,
      PIN: 'RAM15',
      answer: options[0],
    },
    {
      question: postDay1Question[27],
      response: firstResponseDay1,
      PIN: 'RAM15',
      answer: options[2],
    },
    {
      question: postDay1Question[28],
      response: firstResponseDay1,
      PIN: 'RAM15',
      answer: options[1],
    },
    {
      question: postDay1Question[29],
      response: firstResponseDay1,
      PIN: 'RAM15',
      answer: options[0],
    },
    {
      question: postDay1Question[28],
      response: firstResponseDay1,
      PIN: 'RAM15',
      answer: options[2],
    },
    {
      question: postDay1Question[29],
      response: firstResponseDay1,
      PIN: 'RAM15',
      answer: options[1],
    },
    {
      question: postDay1Question[28],
      response: firstResponseDay1,
      PIN: 'RAM15',
      answer: options[2],
    },
    {
      question: postDay1Question[29],
      response: firstResponseDay1,
      PIN: 'RAM15',
      answer: options[0],
    },
    {
      question: postDay1Question[28],
      response: firstResponseDay1,
      PIN: 'RAM15',
      answer: options[2],
    },

    // post session 1 no 2
    // behavioural 2,3
    {
      question: postDay1Question[0],
      response: secondResponseDay1,
      PIN: 'RAM16',
      answer: 6,
    },
    {
      question: postDay1Question[1],
      response: secondResponseDay1,
      PIN: 'RAM16',
      answer: 6,
    },
    {
      question: postDay1Question[2],
      response: secondResponseDay1,
      PIN: 'RAM16',
      answer: 6,
    },
    {
      question: postDay1Question[3],
      response: secondResponseDay1,
      PIN: 'RAM16',
      answer: 6,
    },
    {
      question: postDay1Question[4],
      response: secondResponseDay1,
      PIN: 'RAM16',
      answer: 6,
    },
    {
      question: postDay1Question[5],
      response: secondResponseDay1,
      PIN: 'RAM16',
      answer: 6,
    },
    {
      question: postDay1Question[6],
      response: secondResponseDay1,
      PIN: 'RAM16',
      answer: 6,
    },
    {
      question: postDay1Question[7],
      response: secondResponseDay1,
      PIN: 'RAM16',
      answer: 6,
    },
    {
      question: postDay1Question[8],
      response: secondResponseDay1,
      PIN: 'RAM16',
      answer: 6,
    },
    {
      question: postDay1Question[9],
      response: secondResponseDay1,
      PIN: 'RAM16',
      answer: 6,
    },
    {
      question: postDay1Question[10],
      response: secondResponseDay1,
      PIN: 'RAM16',
      answer: 6,
    },
    {
      question: postDay1Question[11],
      response: secondResponseDay1,
      PIN: 'RAM16',
      answer: 6,
    },
    {
      question: postDay1Question[12],
      response: secondResponseDay1,
      PIN: 'RAM16',
      answer: 7,
    },
    // your trainer 1
    {
      question: postDay1Question[13],
      response: secondResponseDay1,
      PIN: 'RAM16',
      answer: options[3],
    },
    {
      question: postDay1Question[14],
      response: secondResponseDay1,
      PIN: 'RAM16',
      answer: options[1],
    },
    {
      question: postDay1Question[15],
      response: secondResponseDay1,
      PIN: 'RAM16',
      answer: options[3],
    },
    {
      question: postDay1Question[16],
      response: secondResponseDay1,
      PIN: 'RAM16',
      answer: options[2],
    },
    {
      question: postDay1Question[17],
      response: secondResponseDay1,
      PIN: 'RAM16',
      answer: options[2],
    },
    {
      question: postDay1Question[18],
      response: secondResponseDay1,
      PIN: 'RAM16',
      answer: options[1],
    },
    // your trainer 2
    {
      question: postDay1Question[19],
      response: secondResponseDay1,
      PIN: 'RAM16',
      answer: options[2],
    },
    {
      question: postDay1Question[20],
      response: secondResponseDay1,
      PIN: 'RAM16',
      answer: options[0],
    },
    {
      question: postDay1Question[21],
      response: secondResponseDay1,
      PIN: 'RAM16',
      answer: options[2],
    },
    {
      question: postDay1Question[22],
      response: secondResponseDay1,
      PIN: 'RAM16',
      answer: options[1],
    },
    {
      question: postDay1Question[23],
      response: secondResponseDay1,
      PIN: 'RAM16',
      answer: options[0],
    },
    {
      question: postDay1Question[24],
      response: secondResponseDay1,
      PIN: 'RAM16',
      answer: options[3],
    },
    {
      question: postDay1Question[25],
      response: secondResponseDay1,
      PIN: 'RAM16',
      answer: options[1],
    },
    {
      question: postDay1Question[26],
      response: secondResponseDay1,
      PIN: 'RAM16',
      answer: options[2],
    },
    {
      question: postDay1Question[27],
      response: secondResponseDay1,
      PIN: 'RAM16',
      answer: options[2],
    },
    {
      question: postDay1Question[28],
      response: secondResponseDay1,
      PIN: 'RAM16',
      answer: options[1],
    },
    {
      question: postDay1Question[29],
      response: secondResponseDay1,
      PIN: 'RAM16',
      answer: options[2],
    },
    {
      question: postDay1Question[28],
      response: secondResponseDay1,
      PIN: 'RAM16',
      answer: options[2],
    },
    {
      question: postDay1Question[29],
      response: secondResponseDay1,
      PIN: 'RAM16',
      answer: options[0],
    },
    {
      question: postDay1Question[28],
      response: secondResponseDay1,
      PIN: 'RAM16',
      answer: options[2],
    },
    {
      question: postDay1Question[29],
      response: secondResponseDay1,
      PIN: 'RAM16',
      answer: options[1],
    },
    {
      question: postDay1Question[28],
      response: secondResponseDay1,
      PIN: 'RAM16',
      answer: options[3],
    },

    // Post-day-2 survey
    // behavioural 2,3
    // {
    //   question: postDay2Question[0],
    //   response: firstResponseDay2,
    //   PIN: 'RAM17',
    //   answer: 6,
    // },
    // {
    //   question: postDay2Question[1],
    //   response: firstResponseDay2,
    //   PIN: 'RAM17',
    //   answer: 6,
    // },
    // {
    //   question: postDay2Question[2],
    //   response: firstResponseDay2,
    //   PIN: 'RAM17',
    //   answer: 6,
    // },
    // {
    //   question: postDay2Question[3],
    //   response: firstResponseDay2,
    //   PIN: 'RAM17',
    //   answer: 6,
    // },
    // {
    //   question: postDay2Question[4],
    //   response: firstResponseDay2,
    //   PIN: 'RAM17',
    //   answer: 6,
    // },
    // {
    //   question: postDay2Question[5],
    //   response: firstResponseDay2,
    //   PIN: 'RAM17',
    //   answer: 6,
    // },
    // {
    //   question: postDay2Question[6],
    //   response: firstResponseDay2,
    //   PIN: 'RAM17',
    //   answer: 6,
    // },
    // {
    //   question: postDay2Question[7],
    //   response: firstResponseDay2,
    //   PIN: 'RAM17',
    //   answer: 6,
    // },
    // {
    //   question: postDay2Question[8],
    //   response: firstResponseDay2,
    //   PIN: 'RAM17',
    //   answer: 6,
    // },
    // {
    //   question: postDay2Question[9],
    //   response: firstResponseDay2,
    //   PIN: 'RAM17',
    //   answer: 6,
    // },
    // {
    //   question: postDay2Question[10],
    //   response: firstResponseDay2,
    //   PIN: 'RAM17',
    //   answer: 6,
    // },
    // {
    //   question: postDay2Question[11],
    //   response: firstResponseDay2,
    //   PIN: 'RAM17',
    //   answer: 6,
    // },
    // {
    //   question: postDay2Question[12],
    //   response: firstResponseDay2,
    //   PIN: 'RAM17',
    //   answer: 6,
    // },
    // // behavioural 4
    // {
    //   question: postDay2Question[13],
    //   response: firstResponseDay2,
    //   PIN: 'RAM17',
    //   answer: 6,
    // },
    // {
    //   question: postDay2Question[14],
    //   response: firstResponseDay2,
    //   PIN: 'RAM17',
    //   answer: 6,
    // },
    // {
    //   question: postDay2Question[15],
    //   response: firstResponseDay2,
    //   PIN: 'RAM17',
    //   answer: 6,
    // },
    // {
    //   question: postDay2Question[16],
    //   response: firstResponseDay2,
    //   PIN: 'RAM17',
    //   answer: 6,
    // },
    // {
    //   question: postDay2Question[17],
    //   response: firstResponseDay2,
    //   PIN: 'RAM17',
    //   answer: 6,
    // },
    // {
    //   question: postDay2Question[18],
    //   response: firstResponseDay2,
    //   PIN: 'RAM17',
    //   answer: 6,
    // },
    // {
    //   question: postDay2Question[19],
    //   response: firstResponseDay2,
    //   PIN: 'RAM17',
    //   answer: 6,
    // },
    // {
    //   question: postDay2Question[20],
    //   response: firstResponseDay2,
    //   PIN: 'RAM17',
    //   answer: 6,
    // },
    {
      question: postDay2Question[21],
      response: firstResponseDay2,
      PIN: 'RAM17',
      answer: 7,
    },
    // your trainer 1
    {
      question: postDay2Question[22],
      response: firstResponseDay2,
      PIN: 'RAM17',
      answer: options[0],
    },
    {
      question: postDay2Question[23],
      response: firstResponseDay2,
      PIN: 'RAM17',
      answer: options[1],
    },
    {
      question: postDay2Question[24],
      response: firstResponseDay2,
      PIN: 'RAM17',
      answer: options[3],
    },
    {
      question: postDay2Question[25],
      response: firstResponseDay2,
      PIN: 'RAM17',
      answer: options[2],
    },
    {
      question: postDay2Question[26],
      response: firstResponseDay2,
      PIN: 'RAM17',
      answer: options[2],
    },
    {
      question: postDay2Question[27],
      response: firstResponseDay2,
      PIN: 'RAM17',
      answer: options[1],
    },
    // your trainer 2
    {
      question: postDay2Question[28],
      response: firstResponseDay2,
      PIN: 'RAM17',
      answer: options[2],
    },
    {
      question: postDay2Question[29],
      response: firstResponseDay2,
      PIN: 'RAM17',
      answer: options[2],
    },
    {
      question: postDay2Question[30],
      response: firstResponseDay2,
      PIN: 'RAM17',
      answer: options[2],
    },
    {
      question: postDay2Question[31],
      response: firstResponseDay2,
      PIN: 'RAM17',
      answer: options[1],
    },
    {
      question: postDay2Question[32],
      response: firstResponseDay2,
      PIN: 'RAM17',
      answer: options[0],
    },
    {
      question: postDay2Question[33],
      response: firstResponseDay2,
      PIN: 'RAM17',
      answer: options[2],
    },
    {
      question: postDay2Question[34],
      response: firstResponseDay2,
      PIN: 'RAM17',
      answer: options[1],
    },
    {
      question: postDay2Question[35],
      response: firstResponseDay2,
      PIN: 'RAM17',
      answer: options[2],
    },
    {
      question: postDay2Question[36],
      response: firstResponseDay2,
      PIN: 'RAM17',
      answer: options[2],
    },
    {
      question: postDay2Question[37],
      response: firstResponseDay2,
      PIN: 'RAM17',
      answer: options[2],
    },
    {
      question: postDay2Question[38],
      response: firstResponseDay2,
      PIN: 'RAM17',
      answer: options[2],
    },
    {
      question: postDay2Question[39],
      response: firstResponseDay2,
      PIN: 'RAM17',
      answer: options[2],
    },
    {
      question: postDay2Question[40],
      response: firstResponseDay2,
      PIN: 'RAM17',
      answer: options[2],
    },
    {
      question: postDay2Question[41],
      response: firstResponseDay2,
      PIN: 'RAM17',
      answer: options[2],
    },
    {
      question: postDay2Question[42],
      response: firstResponseDay2,
      PIN: 'RAM17',
      answer: options[2],
    },
    {
      question: postDay2Question[43],
      response: firstResponseDay2,
      PIN: 'RAM17',
      answer: options[2],
    },

    // pre-train-trainers responses
    // first response
    {
      question: preTrainTrainerQuestions[0],
      response: trainTheTrainersResponses[0],
      PIN: 'PIV15',
      answer: options[0],
    },
    {
      question: preTrainTrainerQuestions[1],
      response: trainTheTrainersResponses[0],
      PIN: 'PIV15',
      answer: options[1],
    },
    {
      question: preTrainTrainerQuestions[2],
      response: trainTheTrainersResponses[0],
      PIN: 'PIV15',
      answer: options[2],
    },
    {
      question: preTrainTrainerQuestions[3],
      response: trainTheTrainersResponses[0],
      PIN: 'PIV15',
      answer: options[3],
    },
    {
      question: preTrainTrainerQuestions[4],
      response: trainTheTrainersResponses[0],
      PIN: 'PIV15',
      answer: options[3],
    },
    {
      question: preTrainTrainerQuestions[5],
      response: trainTheTrainersResponses[0],
      PIN: 'PIV15',
      answer: options[0],
    },
    {
      question: preTrainTrainerQuestions[6],
      response: trainTheTrainersResponses[0],
      PIN: 'PIV15',
      answer: options[1],
    },
    {
      question: preTrainTrainerQuestions[7],
      response: trainTheTrainersResponses[0],
      PIN: 'PIV15',
      answer: options[2],
    },
    {
      question: preTrainTrainerQuestions[8],
      response: trainTheTrainersResponses[0],
      PIN: 'PIV15',
      answer: options[3],
    },
    {
      question: preTrainTrainerQuestions[9],
      response: trainTheTrainersResponses[0],
      PIN: 'PIV15',
      answer: options[0],
    },
    {
      question: preTrainTrainerQuestions[10],
      response: trainTheTrainersResponses[0],
      PIN: 'PIV15',
      answer: options[1],
    },
    {
      question: preTrainTrainerQuestions[11],
      response: trainTheTrainersResponses[0],
      PIN: 'PIV15',
      answer: options[2],
    },
    {
      question: preTrainTrainerQuestions[12],
      response: trainTheTrainersResponses[0],
      PIN: 'PIV15',
      answer: options[3],
    },
    {
      question: preTrainTrainerQuestions[13],
      response: trainTheTrainersResponses[0],
      PIN: 'PIV15',
      answer: options[0],
    },
    {
      question: preTrainTrainerQuestions[14],
      response: trainTheTrainersResponses[0],
      PIN: 'PIV15',
      answer: options[1],
    },
    {
      question: preTrainTrainerQuestions[14],
      response: trainTheTrainersResponses[0],
      PIN: 'PIV15',
      answer: options[1],
    },
    {
      question: preTrainTrainerQuestions[15],
      response: trainTheTrainersResponses[0],
      PIN: 'PIV15',
      answer: options[2],
    },

    // second response
    {
      question: preTrainTrainerQuestions[0],
      response: trainTheTrainersResponses[1],
      PIN: 'SLU23',
      answer: options[1],
    },
    {
      question: preTrainTrainerQuestions[1],
      response: trainTheTrainersResponses[1],
      PIN: 'SLU23',
      answer: options[2],
    },
    {
      question: preTrainTrainerQuestions[2],
      response: trainTheTrainersResponses[1],
      PIN: 'SLU23',
      answer: options[3],
    },
    {
      question: preTrainTrainerQuestions[3],
      response: trainTheTrainersResponses[1],
      PIN: 'SLU23',
      answer: options[0],
    },
    {
      question: preTrainTrainerQuestions[4],
      response: trainTheTrainersResponses[1],
      PIN: 'SLU23',
      answer: options[1],
    },
    {
      question: preTrainTrainerQuestions[5],
      response: trainTheTrainersResponses[1],
      PIN: 'SLU23',
      answer: options[2],
    },
    {
      question: preTrainTrainerQuestions[6],
      response: trainTheTrainersResponses[1],
      PIN: 'SLU23',
      answer: options[3],
    },
    {
      question: preTrainTrainerQuestions[7],
      response: trainTheTrainersResponses[1],
      PIN: 'SLU23',
      answer: options[0],
    },
    {
      question: preTrainTrainerQuestions[8],
      response: trainTheTrainersResponses[1],
      PIN: 'SLU23',
      answer: options[1],
    },
    {
      question: preTrainTrainerQuestions[9],
      response: trainTheTrainersResponses[1],
      PIN: 'SLU23',
      answer: options[2],
    },
    {
      question: preTrainTrainerQuestions[10],
      response: trainTheTrainersResponses[1],
      PIN: 'SLU23',
      answer: options[3],
    },
    {
      question: preTrainTrainerQuestions[11],
      response: trainTheTrainersResponses[1],
      PIN: 'SLU23',
      answer: options[0],
    },
    {
      question: preTrainTrainerQuestions[12],
      response: trainTheTrainersResponses[1],
      PIN: 'SLU23',
      answer: options[1],
    },
    {
      question: preTrainTrainerQuestions[13],
      response: trainTheTrainersResponses[1],
      PIN: 'SLU23',
      answer: options[2],
    },
    {
      question: preTrainTrainerQuestions[14],
      response: trainTheTrainersResponses[1],
      PIN: 'SLU23',
      answer: options[3],
    },
    {
      question: preTrainTrainerQuestions[14],
      response: trainTheTrainersResponses[1],
      PIN: 'SLU23',
      answer: options[0],
    },
    {
      question: preTrainTrainerQuestions[15],
      response: trainTheTrainersResponses[1],
      PIN: 'SLU23',
      answer: options[0],
    },
  ];
  return Answer.create(answers);
};
