#!/usr/bin/env node
/* eslint-disable no-console */
const _ = require('lodash');
const readInput = require('./util/readInput');
readInput.then((input) => input[0].split('\n'))
.map((input) => parseInt(input))
.then((instructions) => {
  let offset = 0;
  let steps = 0;

  do {
    offset += (instructions[offset] >= 3 ? instructions[offset]-- : instructions[offset]++);
    steps++;
  } while (offset >= 0 && offset < instructions.length);

  return steps;
})
.then(console.log);
