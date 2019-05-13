const findRate = (array) => {
  const a = array.reduce((accu, item) => accu + Number(item.answer), 0);
  return (a / array.length).toPrecision(2);
};
export default findRate;
