// PIN validation
export const validPIN = string => {
  const regex = new RegExp('^[a-z]{3}[0-9]{1,2}$', 'i');
  console.log(string);
  return regex.test(string);
};

export const validPostcode = postcode => {
  postcode.replace(/\s/g, '');
  const regex = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/;
  return regex.test(postcode);
};
