const _ = require('lodash');

module.exports = (input) =>
  input.split('\n')
    .map((pass) => pass.split(' '))
    .filter((pass) => {
      return _.chain(pass).countBy().every((count) => count === 1).value();
    })
    .length;
