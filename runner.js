#!/usr/bin/env node
/* eslint-disable no-console */
if (process.argv.length <= 2) {
  console.log('Usage: runner.js <day> [part] [input]');
  process.exit(-1);
}

let day = process.argv[2];
const part = process.argv[3] || 'a';
const input = process.argv[4];

const solution = require(`./${day}${part}`);
const readFile = require('./util/readFile');

const resolve = input ? Promise.resolve(input) : readFile(`input/${day}.dat`);

resolve
  .then(solution)
  .then(console.log);
