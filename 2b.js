const _ = require('lodash');

module.exports = (input) =>
  input.split('\n')
    .map((v) => v.split('\t'))
    .map((a) => a.map((d) => parseInt(d)))
    .map((a) => {
      const result = _.flatMap(a, (left, lIdx) => a.map((right, rIdx) => lIdx !== rIdx && left % right === 0 && left / right)).filter((v) => v);
      return _.head(result);
    })
    .reduce((total, v) => total + v, 0);
