const _ = require('lodash');

module.exports = (input) => {
  const moves = input.split(',')
  const programs = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'];

  let positions = _.fromPairs(programs.map((program, index) => [program, index]));
  const originalPositions = positions;

  const parsedMoves = moves.map((unparsed) => {
    const match = unparsed.match(/(\w)(.*)/);
    const arg = match[2].split('/');

    let args = {};
    const move = match[1];

    switch (move) {
      case 's': {
        args.spins = parseInt(match[2]);
        break;
      }
      case 'x': {
        const swapIndex = arg.map((index) => parseInt(index));
        args.a = swapIndex[0];
        args.b = swapIndex[1];
        break;
      }
      case 'p': {
        args.a = arg[0];
        args.b = arg[1];
        break;
      }
    }

    return {
      move,
      ...args
    }
  });

  const mutations = {};

  for (let i = 0; i < 1000000000 ; i++) {
    const start = _.sortBy(_.toPairs(positions), ([prog, pos]) => pos).map(([p]) => p).join('');
    if (mutations[start]) {
      let result = mutations[start];
      i++;
      // const left = (i - 1000000000) % Object.keys(mutations).length;
      let z = 0;
      while (i < 1000000000) {
        result = mutations[result];
        i++;
      }

      return result;
    }

    parsedMoves.forEach(({ move, spins, a, b }) => {
      switch (move) {
        case 's': {
          positions = _.mapValues(positions, (v) => (v + spins) % programs.length);
          break;
        }
        case 'x': {
          const keyA = _.findKey(positions, (v) => v === a);
          const keyB = _.findKey(positions, (v) => v === b);
          const indexA = positions[keyA];
          positions[keyA] = positions[keyB];
          positions[keyB] = indexA;
          break;
        }
        case 'p': {
          const indexA = positions[a];
          positions[a] = positions[b];
          positions[b] = indexA;
          break;
        }
      }
    })

    mutations[start] = _.sortBy(_.toPairs(positions), ([prog, pos]) => pos).map(([p]) => p).join('');
  }

  return _.sortBy(_.toPairs(positions), ([prog, pos]) => pos).map(([p]) => p).join('');
}
