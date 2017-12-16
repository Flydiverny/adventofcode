#!/usr/bin/env node
/* eslint-disable no-console */
const _ = require('lodash');
const readFile = require('./util/readFile');
readFile('input/7.dat')
  .then((input) => input.split(/\n/))
  .filter((input) => input)
  .map((row) => {
    const match = row.match(/(\w+) \(([0-9]*)\)( -> (.*))?/);
    const full = match[0];
    const program = match[1];
    const weight = match[2];
    const ignored = match[3];
    const leaves = match[4];
    return {
      program,
      leaves: leaves && leaves.split(',').map((l) => l.trim()),
    }
  })
  .then((programs) => {
    return programs.reduce((tree, { program, leaves }) => {
      if (!tree[program]) {
        tree[program] = {
          program,
          references: 0,
        }
      }

      if (leaves) {
        tree[program].leaves = leaves;

        leaves.forEach((leaf) => {
          if (tree[leaf]) {
            tree[leaf].references++;
          } else {
            tree[leaf] = {
              program: leaf,
              references: 1,
            }
          }
        });
      }

      return tree;
    }, {});
  })
  .then((tree) => {
    return _.head(_.filter(tree, (programs) => programs.references === 0));
  })
  .then((input) => {
    const result = input;
    return result;
  })
  .then(console.log);
