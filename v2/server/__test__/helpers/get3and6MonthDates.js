const { getScheduleDates } = require('../../helpers/get3and6MonthDates');

describe('Test get3and6MonthDates helper', () => {
  test('increases date by 3 months', () => {
    // const trainer = await User.find({ role: 'admin' });
    const newDates = getScheduleDates('02/02/2019', 3);

    expect(newDates).toBe(
      'Thu May 02 2019 00:00:00 GMT+0100 (British Summer Time)'
    );
  });

  test('increases date by 6 months', () => {
    // const trainer = await User.find({ role: 'admin' });
    const newDates = getScheduleDates('02/02/2019', 6);

    expect(newDates).toBe(
      'Fri Aug 02 2019 00:00:00 GMT+0100 (British Summer Time)'
    );
  });
});
