const _ = require('lodash');

module.exports = (input) => {
  const path = input.split(',');

  let x = 0, y = 0;

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
  })

  return Math.abs(Math.max(x, y));
};
