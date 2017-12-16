#!/usr/bin/env node
/* eslint-disable no-console */
const _ = require('lodash');
const readFile = require('./util/readFile');
readFile('input/8.dat')
  .then((input) => input.split(/\n/))
  .filter((input) => input)
  .map((instr) => {
    const match = instr.match(/(\w+) (\w+) (-?\d+) if (\w+) (.*)/);

    const result = {
      target: match[1],
      factor: match[2] === 'inc' ? 1 : -1,
      value: match[3],
      compare: match[4],
      condition: match[5],
    };

    return result;
  })
  .then((instructions) => {
    const registry = {};
    let highestValue = 0;

    instructions.forEach(({ target, factor, value, compare, condition }) => {
      const compareValue = registry[compare] || 0;

      if (eval(`${compareValue} ${condition}`)) {
        const targetValue = registry[target] || 0;
        registry[target] = targetValue + factor * value;
      }

      highestValue = Math.max(highestValue, findMax(registry));
    });

    return highestValue;
  })
  .then(console.log);

  const findMax = (registry) => {
   return _.maxBy(_.toPairs(registry), ([reg, value]) => value)[1];
  }
