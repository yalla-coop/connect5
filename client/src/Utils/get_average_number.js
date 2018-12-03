export default (array) => {
//  retrun the average of array elements
  const output = [];
  array.map((item) => {
    const sum = item.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return sum ? output.push((sum / item.length).toPrecision(2)) : output.push(0);
  });
  return output;
};
