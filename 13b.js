const _ = require('lodash');

module.exports = (rawInput) => {
  const input = rawInput.split(/\n/)
    .map((row) => row.split(': '))
    .map(([depth, range]) => [depth, parseInt(range)]);

  const firewall = _.fromPairs(input);
  const last = input[input.length - 1];
  let caught;
  let delay = 0;

  do {
    caught = false;
    let depth = 0;

    do {
      const range = firewall[depth];
      if (range) {

        if (scannerPos(depth + delay, range) === 0) {
          caught = true;
        }
      }

      depth++;
    } while (depth <= last[0]);

    delay++;
  } while (caught);

  return delay - 1;
}

const scannerPos = (tickIn, rangeIn) => {
  const range = rangeIn - 1;
  const steps = tickIn % (range * 2);
  return steps > range ? 2 * range - steps : steps;
}
