const _ = require('lodash');

module.exports = (input) => {
  const moves = input.split(',')
  const programs = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'];

  let positions = _.fromPairs(programs.map((program, index) => [program, index]));

  moves.forEach((move) => {
    const match = move.match(/(\w)(.*)/);
    const arg = match[2].split('/');

    switch (match[1]) {
      case 's': {
        const spins = parseInt(match[2]);
        positions = _.mapValues(positions, (v) => (v + spins) % programs.length);
        break;
      }
      case 'x': {
        const swapIndex = arg.map((index) => parseInt(index));
        const keyA = _.findKey(positions, (v) => v === swapIndex[0]);
        const keyB = _.findKey(positions, (v) => v === swapIndex[1]);
        const indexA = positions[keyA];
        positions[keyA] = positions[keyB];
        positions[keyB] = indexA;
        break;
      }
      case 'p': {
        const keyA = arg[0];
        const keyB = arg[1];
        const indexA = positions[keyA];
        positions[keyA] = positions[keyB];
        positions[keyB] = indexA;
        break;
      }
    }
  })

  return _.sortBy(_.toPairs(positions), ([prog, pos]) => pos).map(([p]) => p).join('');
}
