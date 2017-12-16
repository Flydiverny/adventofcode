const _ = require('lodash');

module.exports = (rawInput) => {
  const lengths = _.map(rawInput, (c) => c.charCodeAt(0)).concat([17,31,73,47,23])
  let list = [...Array(256)].map((v, index) => index);

  let current = 0;
  let skip = 0;

  for (let itr = 0; itr < 64; itr++) {
    lengths.forEach((l) => {
      const reverse = [];

      if (l > list.length) {
        return;
      }

      for (let i = l-1; i >= 0; i--) {
        reverse.push(list[(current + i) % list.length]);
      }

      for (let i = 0; i < l; i++) {
        list[(current + i) % list.length] = reverse[i];
      }

      current += l + skip++;
    });
  }

  return _.chunk(list, 16).reduce((total, chunk) => {
    return total + _.padStart(chunk.reduce((xor, current) => xor ^ current).toString(16), 2, "0")
  }, "")
}
