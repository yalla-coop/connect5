const { getScheduleDates } = require('../../helpers/get3and6MonthDates');

describe('Test get3and6MonthDates helper', () => {
  test('increases date by 3 months', () => {
    // const trainer = await User.find({ role: 'admin' });
    const newDates = getScheduleDates('02/02/2019', 3);

    const newDateArr = newDates.split(' ');

    expect(newDateArr[0]).toBe('Thu');
    expect(newDateArr[1]).toBe('May');
    expect(newDateArr[2]).toBe('02');
    expect(newDateArr[3]).toBe('2019');
  });

  test('increases date by 6 months', () => {
    // const trainer = await User.find({ role: 'admin' });
    const newDates = getScheduleDates('02/02/2019', 6);

    const newDateArr = newDates.split(' ');

    expect(newDateArr[0]).toBe('Fri');
    expect(newDateArr[1]).toBe('Aug');
    expect(newDateArr[2]).toBe('02');
    expect(newDateArr[3]).toBe('2019');
  });
});
