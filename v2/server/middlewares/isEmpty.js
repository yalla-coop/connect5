// global function to check any input if empty/ undefined/ null to identify errors
// addition to validators isEmpty function which only checks for empty strings

module.exports = value =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);
