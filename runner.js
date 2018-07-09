#!/usr/bin/env node
/* eslint-disable no-console */
const Promise = require("bluebird");
const meow = require("meow");
const readFile = require("./util/readFile");
const readInput = require("./util/readInput");

const cli = meow(
  `
  Usage
    $ runner <day> [part]

  Options
    --input, -i  Run using test input

  Examples
    $ runner 1 a
`,
  {
    flags: {
      input: {
        type: "string",
        alias: "i"
      }
    }
  }
);

const foo = ([day, part = "a"], { input }) => {
  if (!day) {
    console.log("Day must be specified");
    process.exit(-1);
  }

  const solution = require(`./solutions/${day}${part}`);

  const pipePromise = readInput
    .then(chunks => chunks[0].trim())
    .catch(() => {});

  const inputPromise = input
    ? Promise.resolve(input)
    : readFile(`input/${day}.dat`);

  Promise.all([pipePromise, inputPromise])
    .then(([pipe, input]) => {
      return pipe || input;
    })
    .then(solution)
    .then(console.log)
    .catch(console.error)
    .finally(() => process.exit());
};

foo(cli.input, cli.flags);
