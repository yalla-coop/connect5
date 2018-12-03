export default (sessions, sessionType) => {
  /**
   * "sessions" array and the "sessionType" will be passed
   * and the function will return the sum (attendees or responses) number
   * for that session, or "0" if the sessionType is not listed in the array
   */
  const session = sessions.filter(item => item._id === sessionType);
  return session[0] ? session[0].sum : 0;
};
