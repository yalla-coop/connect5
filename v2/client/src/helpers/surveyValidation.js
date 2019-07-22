// PIN validation
export const validLetters = string => {
  const regex = /[a-z]{1,3}/gim;
  return regex.test(string);
};

export const validNumbers = string => {
  const regex = /^[0-9]{1,2}$/gim;
  return regex.test(string);
};

export const validPostcode = postcode => {
  postcode.replace(/\s/g, '');
  const regex = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/;
  return regex.test(postcode);
};
