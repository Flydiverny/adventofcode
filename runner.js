#!/usr/bin/env node
/* eslint-disable no-console */
if (process.argv.length <= 2) {
  console.log('Usage: runner.js <day> [part]');
  process.exit(-1);
}

let day = process.argv[2];
const part = process.argv[3] || 'a';

const solution = require(`./${day}${part}`);
const readFile = require('./util/readFile');

readFile(`input/${day}.dat`)
  .then(solution)
  .then(console.log);
