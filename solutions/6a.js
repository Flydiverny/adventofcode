const _ = require('lodash');

module.exports = (input) => {
  const memory = input.split('\t')
    .map((input) => parseInt(input));

  const history = [];
  let cycles = 0;

  do {
    history.push(memory.join(','));

    const blocks = _.max(memory);
    const bank = _.indexOf(memory, blocks);

    memory[bank] = 0;

    for (let block = 1; block <= blocks; block++) {
      memory[(bank + block) % memory.length]++;
    }

    cycles++;
  } while (!_.includes(history, memory.join(',')))

  return cycles;
}
