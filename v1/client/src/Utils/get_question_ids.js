export default (questions) => {
  /**
   * Get an array of questions
   * and iterate over the array
   * then get the id of each question
   * and add them into "output" array
   */
  const output = [];
  questions.map(item => output.push(item._id));
  return output;
};
