#!/usr/bin/env node
/* eslint-disable no-console */
const _ = require('lodash');

const UP = 'up';
const RIGHT = 'right';
const LEFT = 'left';
const DOWN = 'down';

const calculateValue = (x, y, buffer) => {
  let adjacent = [
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [1, 0],
    [1, 1],
    [0,  1],
  ];

  return adjacent.reduce((total, [dx, dy]) => {
    const value = buffer.get(x+dx, y+dy);
    return value ? total + value : total;
  }, 0);
}

class Buffer {
  constructor(init) {
    this.storage = Object.assign({}, init);
  }

  set(x, y, value) {
    this.storage[`${x},${y}`] = value;
  }

  get(x, y) {
    return this.storage[`${x},${y}`];
  }

}

module.exports = (input) => {

  let width = 1;
  let height = 1;
  let dir = RIGHT;
  let s = 1;
  let x = 0, y = 0;

  const buffer = new Buffer({ '0,0': 1 });

  do {
    switch (dir) {
      case RIGHT: {
        if (++x === width) dir = UP;
        break;
      }

      case UP: {
        if (++y === height) dir = LEFT;break;
      }
      case LEFT: {
        if (Math.abs(--x) === width) {
          dir = DOWN;
          width++;
        }
        break;
      }
      case DOWN: {
        if (Math.abs(--y) === height) {
          dir = RIGHT;
          height++;
        }
        break;
      }
    }

    buffer.set(x, y, calculateValue(x, y, buffer));
  } while (buffer.get(x, y) < input);

  return buffer.get(x, y);
}
