const _ = require('lodash');

module.exports = (input) => _.reduce(input, (total, c, index) => total + (c === input[(index + input.length / 2) % input.length] ? parseInt(c) : 0), 0);
