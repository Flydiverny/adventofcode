#!/usr/bin/env node
/* eslint-disable no-console */
const Promise = require('bluebird');

if (process.argv.length <= 2) {
  console.log('Usage: runner.js <day> [part] [input]');
  process.exit(-1);
}

let day = process.argv[2];
const part = process.argv[3] || 'a';
const input = process.argv[4];

const solution = require(`./${day}${part}`);
const readFile = require('./util/readFile');
const readInput = require('./util/readInput');

const pipePromise = readInput
  .then((chunks) => chunks[0].trim())
  .catch(() => {})

const argPromise = Promise.resolve(input);

const filePromise = readFile(`input/${day}.dat`);

Promise.all([pipePromise, argPromise, filePromise])
  .then(([pipe, arg, file]) => {
    return pipe || arg || file;
  })
  .then(solution)
  .then(console.log)
  .catch(console.error)
  .finally(() => process.exit());
