const _ = require('lodash');

module.exports = (rawInput) => {
  const input = rawInput.split(',').map((nbr) => parseInt(nbr));
  let list = [...Array(256)].map((v, index) => index);

  let current = 0;
  let skip = 0;
  let length = list.length;

  input.forEach((l) => {
    const reverse = [];

    if (l > length) {
      return;
    }

    for (let i = l-1; i >= 0; i--) {
      reverse.push(list[(current + i) % length]);
    }

    for (let i = 0; i < l; i++) {
      list[(current + i) % length] = reverse[i];
    }

    current += l + skip++;
  });

  return list[0] * list[1];
}
