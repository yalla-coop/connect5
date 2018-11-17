const getQuestions = async url => {
  const response = await fetch(url);

  const body = await response.json();

  if (response.status !== 200) throw Error(body.message);

  console.log("BODY", body);
  return body;
};

export default getQuestions;
