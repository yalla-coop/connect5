// PIN validation
export const validPIN = string => {
  const regex = new RegExp('^[a-z]{3}[0-9]{1,2}$', 'i');
  return regex.test(string);
};
