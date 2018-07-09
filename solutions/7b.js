const _ = require('lodash');

module.exports = (input) => {
  const tree = input.split(/\n/)
    .map((row) => {
      const match = row.match(/(\w+) \(([0-9]*)\)( -> (.*))?/);
      const leaves = match[4];
      return {
        program: match[1],
        weight: parseInt(match[2]),
        leaves: leaves && leaves.split(',').map((l) => l.trim()),
      }
    })
    .reduce((tree, { program, weight, leaves }) => {
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
  const root = _.head(_.filter(tree, (programs) => programs.references === 0)).program

  try {
    treeWeight(tree, root);
  } catch (e) {
    return e.message;
  }
}

const treeWeight = (tree, program) => {
  if (tree[program].leaves) {
    const leaves = tree[program].leaves.map((leaf) => {
      return { program: leaf, weight: treeWeight(tree, leaf) };
    });

    const grouped = _.groupBy(leaves, 'weight');
    const skewed = _.keys(grouped).length > 1;
    if (skewed) {
      const skewer = _.find(grouped, (arr) => arr.length === 1);
      const needed = _.find(grouped, (arr) => arr.length > 1);
      const neededWeight = tree[skewer[0].program].weight + (needed[0].weight - skewer[0].weight);
      throw new Error(skewer[0].program + ' should be weight ' + neededWeight)
    }

    return tree[program].weight + leaves.reduce((total, { weight }) => total + weight, 0);
  } else {
    return tree[program].weight;
  }
}
