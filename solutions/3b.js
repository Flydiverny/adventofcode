#!/usr/bin/env node
const adjacent = [
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [1, 0],
  [1, 1],
  [0, 1]
];

const dirMod = [[1, 0], [0, 1], [-1, 0], [0, -1]];

const nextDir = dir => (dir + 1) % dirMod.length;
const nextPos = ([x, y], [dx, dy]) => [x + dx, y + dy];

const getDirection = (dir, c, buffer) =>
  !buffer[nextPos(c, dirMod[nextDir(dir)])] ? nextDir(dir) : dir;

const calculateValue = (c, buffer) =>
  adjacent.reduce((tot, delta) => (buffer[nextPos(c, delta)] || 0) + tot, 0);

module.exports = input => {
  let dir = 0,
    c = [0, 0];

  const buffer = { [c]: 1 };

  do {
    c = nextPos(c, dirMod[dir]);
    dir = getDirection(dir, c, buffer);
    buffer[c] = calculateValue(c, buffer);
  } while (buffer[c] < input);

  return buffer[c];
};
