#!/usr/bin/env node
/* eslint-disable no-console */
const _ = require('lodash');
const readInput = require('./util/readInput');
readInput.then((input) => input[0].split('\t'))
.map((input) => parseInt(input))
.then((input) => {
  let array = input;
  const length = input.length;
  const seen = [];
  let itr = 0;

  do {
    seen.push(array.join(','));

    const max = _.max(array);
    const index = _.indexOf(array, max);

    array[index] = 0;

    for (let dist = 1; dist <= max; dist++) {
      array[(index + dist) % length]++;
    }

    itr++;
  } while (!_.includes(seen, array.join(',')))

  return itr - _.indexOf(seen, array.join(','));
})
.then(console.log);
