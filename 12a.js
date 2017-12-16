const _ = require('lodash');

const canConnect = (pipelines, programToReach) => function connect(program, traversed = []) {
  if (program === programToReach) {
    return true;
  }

  return _.chain(pipelines[program].pipeTo)
    .filter((pipe) => !_.includes(traversed, pipe))
    .find((pipe) => connect(pipe, traversed.concat([pipe])))
    .value();
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

  const programToReach = '0';
  const connect = canConnect(pipelines, programToReach);

  const connectable = _.filter(pipelines, ({ program }) => connect(program));

  return connectable.length;
}
