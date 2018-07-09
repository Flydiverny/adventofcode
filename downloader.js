#!/usr/bin/env node
/* eslint-disable no-console */
const Promise = require("bluebird");
const fetch = require("isomorphic-fetch");
const meow = require("meow");
const _ = require("lodash");
const { promisify } = require('util');

const writeFile = promisify(require('fs').writeFile);

const cli = meow(`
	Usage
	  $ downloader <session>

	Examples
	  $ downloader 6e535dc603a94699ab19833a38ad5e5b...
`);

const foo = ([cookie]) => {
  Promise.all(_.chain(Array(25))
    .map((x, i) => i + 1)
    .map(day =>
      fetch(`http://adventofcode.com/2017/day/${day}/input`, {
        headers: { Cookie: `session=${cookie}` }
      })
      .then((response) => response.text())
      .then((body) =>
        writeFile(`input/${day}.dat`, body)
        .then(() => `Downloaded day ${day}`)
      )
    )
    .values())
    .then((data) => {
      console.log(data);
      console.log("Download finished");
    })
};

foo(cli.input, cli.flags);
