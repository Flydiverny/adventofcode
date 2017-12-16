const _ = require('lodash');

module.exports = (input) => {
  const instructions = input.split('\n')
    .map((input) => parseInt(input));

  let offset = 0;
  let steps = 0;

  do {
    offset = offset + instructions[offset]++;
    steps++;
  } while (offset >= 0 && offset < instructions.length);

  return steps;
}
