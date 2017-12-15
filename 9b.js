const _ = require('lodash');

module.exports = (stream) => {
  let ignoreNext = false;
  let insideGarbage = false;
  let depth = 0;
  let score = 0;
  let garbage = 0;
  _.forEach(stream, (char) => {
    console.log('Current:', char, 'Should ignore:', ignoreNext, 'Inside garbage:', insideGarbage, 'depth:', depth, 'score', score);
    if (ignoreNext) {
      ignoreNext = false;
      return;
    }

    if (char === '!') {
      ignoreNext = true;
      return;
    }

    if (insideGarbage) {
      if (char === '>') {
        insideGarbage = false;
        return;
      }
      garbage++;
      return;
    }

    switch (char) {
      case '{':
        depth++;
        return;
      case '<':
        insideGarbage = true;
        return;
      case '}':
        score += depth;
        depth--;
        return;
      default:
        return;
    }
  });

  return garbage;
};

