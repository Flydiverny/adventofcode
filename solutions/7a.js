const _ = require('lodash');

module.exports = (input) => {
  const tree = input.split(/\n/)
    .map((row) => {
      const match = row.match(/(\w+) \(([0-9]*)\)( -> (.*))?/);
      const leaves = match[4];
      return {
        program: match[1],
        weight: match[2],
        leaves: leaves && leaves.split(',').map((l) => l.trim()),
      }
    })
    .reduce((tree, { program, leaves }) => {
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

  return _.head(_.filter(tree, (programs) => programs.references === 0));

}
