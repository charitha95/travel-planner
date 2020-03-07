const { getDates } = require('./app');
test('test forecast values', async  () => {
  const date = 1583492323;
  const divider = 1000;
  expect(getDates(date, divider)).toBe(1583492);
})