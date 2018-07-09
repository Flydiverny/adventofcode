const _ = require('lodash');

module.exports = (input) => {
  const registry = {};
  let highestValue = 0;

  input.split(/\n/)
    .map((instr) => {
      const match = instr.match(/(\w+) (\w+) (-?\d+) if (\w+) (.*)/);

      return {
        write: match[1],
        sign: match[2] === 'inc' ? 1 : -1,
        value: match[3],
        read: match[4],
        condition: match[5],
      };
    }).forEach(({ write, sign, value, read, condition }) => {
      const readValue = registry[read] ||  0;

      if (eval(`${readValue} ${condition}`)) {
        const writeValue = registry[write] || 0;
        registry[write] = writeValue + sign * value;
      }

      highestValue = Math.max(highestValue, findMax(registry));
    });

  return highestValue;
}

const findMax = (registry) => {
  return _.maxBy(_.toPairs(registry), ([reg, value]) => value)[1];
}
