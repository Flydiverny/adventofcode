const _ = require('lodash');

module.exports = (input) => {
  const path = input.split(',');

  let x = 0, y = 0, max = 0;

  path.forEach((step) => {
    if (step.includes('n')) {
      y++;
    } else {
      y--;
    }

    if (step.includes('w')) {
      x--;
    } else if (step.includes('e')) {
      x++;
    }

    max = Math.max(max, x, y);
  })

  return max;
};
