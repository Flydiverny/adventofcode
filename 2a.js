const _ = require('lodash');

module.exports = (input) =>
  input.split('\n')
    .map((v) => v.split('\t'))
    .map((a) => a.map((d) => parseInt(d)))
    .reduce((total, a) => total + Math.max(...a) - Math.min(...a), 0);

