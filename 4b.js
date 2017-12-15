#!/usr/bin/env node
/* eslint-disable no-console */
const _ = require('lodash');

module.exports = (input) =>
  input.split('\n')
    .map((pass) => pass.split(' '))
    .filter((pass) => {
      return _.chain(pass).countBy((word) => _.map(word).sort()).every((count) => count === 1).value();
    })
    .length;
