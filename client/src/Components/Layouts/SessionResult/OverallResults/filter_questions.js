const filterquestions = (questions) => {
  console.log(questions.slice(5 - questions.length));

  return questions.slice(5 - questions.length);
};
export default filterquestions;
