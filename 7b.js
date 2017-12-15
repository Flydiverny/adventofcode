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
      weight: parseInt(weight),
      leaves: leaves && leaves.split(',').map((l) => l.trim()),
    }
  })
  .then((programs) => {
    return programs.reduce((tree, { program, weight, leaves }) => {
      if (!tree[program]) {
        tree[program] = {
          program,
          weight,
          references: 0,
        }
      } else {
        tree[program].weight = weight;
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
    return { tree, root: _.head(_.filter(tree, (programs) => programs.references === 0)).program }
  })
  .then(({ tree, root }) => {
    treeWeight(tree, root)

  })
  .then(console.log);

  const treeWeight = (tree, program) => {
    if (tree[program].leaves) {
      const leaves = tree[program].leaves.map((leaf) => {
        return { leaf, weight: treeWeight(tree, leaf) };
      });

      const grouped = _.groupBy(leaves, 'weight');
      const skewed = _.keys(grouped).length > 1;
      if (skewed) {
        const skewer = _.find(grouped, (arr) => arr.length === 1);
        const needed = _.find(grouped, (arr) => arr.length > 1);
        const neededWeight = tree[skewer[0].leaf].weight + (needed[0].weight - skewer[0].weight);
        throw new Error(skewer[0].program + 'should be weight ' + neededWeight)
      }

      return tree[program].weight + leaves.reduce((total, { weight }) => total + weight, 0);
    } else {
      return tree[program].weight;
    }
  }
