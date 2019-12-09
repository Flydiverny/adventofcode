import R from "ramda";

const getModifier = direction => {
  switch (direction) {
    case "R":
      return { dx: 1, dy: 0 };
    case "L":
      return { dx: -1, dy: 0 };
    case "U":
      return { dx: 0, dy: 1 };
    case "D":
      return { dx: 0, dy: -1 };
  }
};

const traverse = (steps, { x, y, stepsTaken }, { dx, dy }) =>
  R.times(
    step => ({
      x: x + (step + 1) * dx,
      y: y + (step + 1) * dy,
      stepsTaken: stepsTaken + (step + 1)
    }),
    steps
  );

export default data => {
  const result = R.pipe(
    R.map(wire =>
      R.pipe(
        R.split(","),
        R.reduce(
          ({ coord, visited }, command) => {
            const [direction, stepsString] = R.splitAt(1, command);
            const steps = parseInt(stepsString);

            const traveled = traverse(steps, coord, getModifier(direction));
            traveled.forEach(
              x =>
                !visited.has(`${x.x},${x.y}`) &&
                visited.set(`${x.x},${x.y}`, x.stepsTaken)
            );

            return { coord: R.last(traveled), visited };
          },
          { coord: { x: 0, y: 0, stepsTaken: 0 }, visited: new Map() }
        )
      )(wire)
    )
  )(data);

  const intersectingKeys = R.pipe(
    R.reduce((acc, { visited }) => {
      Array.from(visited.keys()).map(key => {
        if (acc.has(key)) {
          acc.set(key, acc.get(key) + 1);
        } else {
          acc.set(key, 1);
        }
      });

      return acc;
    }, new Map()),
    x => Array.from(x.entries()),
    R.filter(([c, crossing]) => crossing >= 2),
    R.map(([c]) => R.sum(result.map(wire => wire.visited.get(c)))),
    R.sort((a, b) => a - b)
  )(result);

  return intersectingKeys[0];
};
