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

const traverse = (steps, { x, y }, { dx, dy }) =>
  R.times(
    step => ({
      x: x + (step + 1) * dx,
      y: y + (step + 1) * dy
    }),
    steps
  );

export default data => {
  const result = R.pipe(
    R.map(wire =>
      R.pipe(
        R.split(","),
        R.reduce(
          ({ coord: { x, y }, visited }, command) => {
            const [direction, stepsString] = R.splitAt(1, command);
            const steps = parseInt(stepsString);

            const traveled = traverse(steps, { x, y }, getModifier(direction));
            traveled.forEach(x => visited.add(`${x.x},${x.y}`));

            return { coord: R.last(traveled), visited };
          },
          { coord: { x: 0, y: 0 }, visited: new Set() }
        )
      )(wire)
    ),
    R.reduce((acc, { visited }) => {
      Array.from(visited.values()).map(key => {
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
    R.map(([c]) => c.split(",")),
    R.map(([a, b]) => Math.abs(a) + Math.abs(b)),
    R.sort((a, b) => a - b)
  )(data);

  console.log("wtf", result);

  return result[0];
};
