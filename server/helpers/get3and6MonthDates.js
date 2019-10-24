// takes the session date and returns the 3 month and 6 month dates for follow up surveys
//   @params - date of the sesssion and number of months you want to increase date

const getScheduleDates = (sessionDate, months) => {
  const d = new Date(sessionDate);
  d.setMonth(d.getMonth() + months);
  return d.toString();
};

module.exports = { getScheduleDates };
