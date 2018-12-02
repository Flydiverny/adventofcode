const tie = require('./10b');
const _ = require('lodash');

module.exports = (input) => {
  const hashTable = [...Array(128)].map((v, index) => tie(`${input}-${index}`))
    .map((hash) => {
      const binary = [];
      for (let i = 0; i < hash.length-1; i += 2) {
        const int = parseInt(hash.substr(i, 2), 16)
        binary.push(_.pad(int.toString(2), 8, "0"))
      }

      return _.flatMap(binary, (eightbit) => _.flatMap(eightbit, (bit) => [parseInt(bit)]));
    })
    // .map((binary) => _.filter(binary, (c) => c === '1').length)
    // .reduce((t, c) => t + c)


  return hashTable;
}
