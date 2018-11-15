// Enter surveys here
const mongoose = require("mongoose");
const mongoDB = require("../../config/keys").mongoURI;

// connect to db
mongoose.connect(
  mongoDB,
  { useNewUrlParser: true }
);

// load model
const Question = require("./models/Question");

// input pre-survey
// drop tables before running the script
// insert question array of objects

Question.deleteMany({})
  .then(console.log("db successfully deleted"))
  .catch(err => console.log(err))
  .then(
    Question.insertMany([
      // Pre-survey questions
      {
        surveyType: 0,
        questionText: "Please enter your Unique ID Number (if applicable)",
        inputType: "text"
      },
      {
        surveyType: 0,
        questionText: "Please select the region",
        inputType: "radio",
        options: [
          "North East",
          "North West",
          "Yorkshire and the Humber",
          "East Midlands",
          "West Midlands",
          "East of England",
          "London",
          "South East",
          "South West",
          "Other (please specify)"
        ]
      },
      {
        surveyType: 0,
        questionText: "Please enter the postcode where you are active",
        inputType: "text",
        helperText:
          "If you do not work in a fixed location please put the postcode your are most often working in",
        options: []
      },
      {
        surveyType: 0,
        questionText: "Please enter your job title",
        inputType: "text"
      },
      {
        surveyType: 0,
        questionText: "Please select your workforce",
        inputType: "radio",
        options: [
          "Emergency services (including fire service, police, ambulance)",
          "Public health specialists and practitioners (e.g. public health consultants, health improvement managers, smoking cessation advisors)",
          "Welfare (e.g. employment advisers, benefits case workers, advisers working on a voluntary basis)",
          "Community health promotion workers/volunteers (e.g. health trainers, health champions, health and wellbeing advisors, breastfeeding volunteers)",
          "Health Professionals (e.g. GPs, nurses, Allied Health Professionals)",
          "Social care and housing professionals (housing officers, social workers, youth workers and other social care professions)",
          "Teaching and educational professionals (e.g. headteachers, teachers, teaching assistants, admin staff working in education settings)",
          "Childcare related professions (e.g. nursery staff, childminders)",
          "Sports and fitness occupations (e.g. sports coaches, fitness instructors and leisure centre employees)",
          "Other (please specify)"
        ]
      },
      {
        surveyType: 0,
        questionText:
          "How would you rate your current knowledge and understanding of mental health and wellbeing?",
        inputType: "radiostar",
        helperText:
          "0 stars means no understanding. 6 stars means excellent understanding",
        options: [1, 2, 3, 4, 5, 6]
      },
      {
        surveyType: 0,
        questionText:
          "In your role, how important is it for you to support somebody with their mental health and wellbeing?",
        inputType: "radiostar",
        helperText:
          "0 stars means not important. 6 stars means every important",
        options: [1, 2, 3, 4, 5, 6]
      },
      {
        surveyType: 0,
        questionText:
          "How confident do you feel in having conversations with individuals about mental health and wellbeing?",
        inputType: "radiostar",
        helperText: "0 stars means not confident. 6 stars means very confident",
        options: [1, 2, 3, 4, 5, 6]
      },

      // Survey 1 questions
      {
        surveyType: 1,
        questionText: "Please enter your Unique ID Number (if applicable)",
        inputType: "text"
      },
      {
        surveyType: 1,
        questionText: "Please select the region",
        inputType: "radio",
        options: [
          "North East",
          "North West",
          "Yorkshire and the Humber",
          "East Midlands",
          "West Midlands",
          "East of England",
          "London",
          "South East",
          "South West",
          "Other (please specify)"
        ]
      },
      {
        surveyType: 1,
        questionText: "Please enter the postcode where you are active",
        inputType: "text",
        helperText:
          "If you do not work in a fixed location please put the postcode your are most often working in",
        options: []
      },
      {
        surveyType: 1,
        questionText: "Please enter your job title",
        inputType: "text"
      },
      {
        surveyType: 1,
        questionText: "Please select your workforce",
        inputType: "radio",
        options: [
          "Emergency services (including fire service, police, ambulance)",
          "Public health specialists and practitioners (e.g. public health consultants, health improvement managers, smoking cessation advisors)",
          "Welfare (e.g. employment advisers, benefits case workers, advisers working on a voluntary basis)",
          "Community health promotion workers/volunteers (e.g. health trainers, health champions, health and wellbeing advisors, breastfeeding volunteers)",
          "Health Professionals (e.g. GPs, nurses, Allied Health Professionals)",
          "Social care and housing professionals (housing officers, social workers, youth workers and other social care professions)",
          "Teaching and educational professionals (e.g. headteachers, teachers, teaching assistants, admin staff working in education settings)",
          "Childcare related professions (e.g. nursery staff, childminders)",
          "Sports and fitness occupations (e.g. sports coaches, fitness instructors and leisure centre employees)",
          "Other (please specify)"
        ]
      },
      {
        surveyType: 1,
        questionText:
          "How would you rate your current knowledge and understanding of mental health and wellbeing?",
        inputType: "radiostar",
        helperText:
          "0 stars means no understanding. 6 stars means excellent understanding",
        options: [1, 2, 3, 4, 5, 6]
      },
      {
        surveyType: 1,
        questionText:
          "In your role, how important is it for you to support somebody with their mental health and wellbeing?",
        inputType: "radiostar",
        helperText:
          "0 stars means not important. 6 stars means every important",
        options: [1, 2, 3, 4, 5, 6]
      },
      {
        surveyType: 1,
        questionText:
          "How confident do you feel in having conversations with individuals about mental health and wellbeing?",
        inputType: "radiostar",
        helperText: "0 stars means not confident. 6 stars means very confident",
        options: [1, 2, 3, 4, 5, 6]
      },
      {
        surveyType: 1,
        questionText: "What did you find most useful from today's training?",
        inputType: "checkbox",
        helperText: "Tick as many as you like",
        options: [
          "Group discussion",
          "New learning around general mental health issues",
          "New learning around mental health approaches (e.g. 5 ways to wellbeing, 5 areas model)",
          "New skills to conduct meaningful mental health related conversations",
          "Case studies",
          "Teacher / facilitator",
          "Everything",
          "Nothing",
          "Other (please specify)"
        ]
      },
      {
        surveyType: 1,
        questionText:
          "Please rate how the training improved your learning on the following areas:",
        inputType: "matrix",
        helperText: "",
        options: {
          columns: [
            "No improvement (0)",
            "Small improvement (1)",
            "Moderate improvement (2)",
            "Improved (3)",
            "Well improved (4)",
            "Greatly improved (5)"
          ],
          rows: [
            "Your understanding of emotional health & wellbeing through the '5 areas' model",
            "Your awareness of the qualities and attitudes needed for addressing mental health & wellbeing",
            "How to start a conversation with people about their mental health & wellbeing",
            "Your confidence to talk to people about their mental health & wellbeing",
            "Your understanding of the importance of self- help material and its uses",
            "Your understanding of local mental health & wellbeing services and how to signpost people to them"
          ]
        }
      },
      {
        surveyType: 1,
        questionText:
          "Please rate the following elements of the training delivery",
        inputType: "matrix",
        options: {
          columns: ["Poor", "Fair", "Average", "Good", "Excellent"],
          rows: [
            "Venue/Location",
            "Trainer facilitation skills",
            "Trainer knowledge about the subject",
            "Pace of training",
            "Training content",
            "Overall view of training"
          ]
        }
      },
      {
        surveyType: 1,
        questionText: "Did the training fulfil your expectations?",
        inputType: "radio",
        options: ["Yes", "No"]
      },
      {
        surveyType: 1,
        questionText:
          "How will your practice/work change as a result of attending this event?",
        inputType: "textarea"
      },
      {
        surveyType: 1,
        questionText:
          "What are your suggestions, if any, for changes that would improve this course?",
        inputType: "textarea"
      },
      {
        surveyType: 1,
        questionText:
          "Is there anything else you would like to tell us about the Connect 5 session 1 training?",
        inputType: "textarea"
      }
    ])
  )
  .then(console.log("successfully inserted"))
  .catch(err => console.log(err));
