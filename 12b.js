const _ = require('lodash');

const collect = (pipelines, program, traversed = []) => {
  const pipesToTravel = _.filter(pipelines[program].pipeTo, (pipe) => !_.includes(traversed, pipe))

  if (pipesToTravel.length === 0) {
    return [program];
  }

  return _.flatMap(pipesToTravel, (pipe) => collect(pipelines, pipe, traversed.push(pipe) && traversed)).concat(program);
};

module.exports = (input) => {
  const pipelines = _.fromPairs(input.split('\n')
    .map((pipeline) => {
      const match = pipeline.match(/(\w+) <-> (.*)/);

      return [match[1], {
        program: match[1],
        pipeTo: match[2].split(',').map((program) => program.trim()),
      }]
    }));

    let groupCount = 0;
    let lines = Object.keys(pipelines);
    do {
      const collected = _.uniq(collect(pipelines, _.head(lines)));
      lines = _.filter(lines, (line) => !_.includes(collected, line));
      groupCount++;
    } while (lines.length > 0);

    return groupCount;
}
