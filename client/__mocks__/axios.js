const viewSessions = [
  {
    __v: 0,
    _id: "5bf3cd830032112611baa750",
    attendees: 8,
    date: "2018-04-17T00:00:00.000Z",
    invitees: 15,
    surveyURL1: "connect5.com/presurvey",
    surveyURL2: "connect5.com/survey1",
    trainer: "5bf3cd830032112611baa74f",
    type: 1,
  },
  {
    __v: 0,
    _id: "5bf3cd830032112611baa751",
    date: "2018-08-22T00:00:00.000Z",
    invitees: 6,
    surveyURL1: "connect5.com/survey2",
    trainer: "5bf3cd830032112611baa74f",
    type: 2,
  },
];

const routeData = {
  "/view-sessions": viewSessions,
};

export default {
  get: jest.fn(url => Promise.resolve({ data: routeData[url] })),
  post: jest.fn(url => Promise.resolve({ data: routeData[url] })),
};
