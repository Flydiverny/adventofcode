const _ = require('lodash');

module.exports = (rawInput) => {
  const input = rawInput.split(/\n/)
    .map((row) => row.split(': '))
    .map(([depth, range]) => [depth, parseInt(range)]);

  const firewall = _.fromPairs(input);
  const last = input[input.length - 1];
  let tick = 0;
  let damage = 0;

  do {
    const range = firewall[tick];
    if (range) {

      if (scannerPos(tick, range) === 0) {
        damage += tick * range;
      }
    }

    tick++;
  } while (tick <= last[0])

  return damage;
}

const scannerPos = (tickIn, rangeIn) => {
  let dir = 1;
  let pos = 0;
  let tick = 0;
  const range = rangeIn - 1;
  while (tick++ < tickIn) {

    pos += dir;

    if (pos === range || pos === 0) {
      dir *= -1;
    }
  } ;
  return pos;
}
