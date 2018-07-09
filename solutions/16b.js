const _ = require('lodash');

module.exports = (input) => {
  const moves = input.split(',')
  const programs = [...'abcdefghijklmnop'];
  let positions = _.fromPairs(programs.map((program, index) => [program, index]));
  const mutations = [];

  for (let i = 0; i < 1000000000; i++) {
    const start = _.sortBy(_.toPairs(positions), ([prog, pos]) => pos).map(([p]) => p).join('');

    if (mutations.includes(start)) {
      return mutations[1000000000 % mutations.length];
    } else {
      mutations.push(start);
    }

    moves.forEach((move) => {
      const match = move.match(/(\w)(.*)/);
      const [a, b] = match[2].split('/');

      switch (match[1]) {
        case 's': {
          positions = _.mapValues(positions, (v) => (v + parseInt(match[2])) % programs.length);
          break;
        }
        case 'x': {
          const ak = positions.indexOf((v) => v === +a);
          const bk = positions.indexOf((v) => v === +b);
          [positions[ak], positions[bk]] = [positions[bk], positions[ak]]
          break;
        }
        case 'p': {
          [positions[a], positions[b]] = [positions[b], positions[a]]
          break;
        }
      }
    })
  }

  return _.sortBy(_.toPairs(positions), ([prog, pos]) => pos).map(([p]) => p).join('');
}
