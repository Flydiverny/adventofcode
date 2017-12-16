const _ = require('lodash');

module.exports = (input) => _.reduce(input, (total, c, index) => total + (c === input[(index + 1) % input.length] ? parseInt(c) : 0), 0);
