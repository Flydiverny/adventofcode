#!/usr/bin/env node
/* eslint-disable no-console */
import meow from "meow";
import readFile from "./util/readFile.js";
import readInput from "./util/readInput.js";

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

const foo = async ([day, part = "a"], { input }) => {
  if (!day) {
    console.log("Day must be specified");
    process.exit(-1);
  }

  const { default: solution } = await import(`./solutions/${day}${part}.js`);

  const pipePromise = readInput
    .then(chunks => chunks[0].trim())
    .catch(() => {});

  const inputPromise = input
    ? Promise.resolve(input)
    : readFile(`input/${day}.dat`);

  const [pipe, inData] = await Promise.all([pipePromise, inputPromise]);

  try {
    const result = await solution((pipe || inData).split("\n"));
    console.log(result);
  } catch (err) {
    console.error("Solution failed", err);
  }

  process.exit();
};

foo(cli.input, cli.flags);
