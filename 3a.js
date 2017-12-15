const stepsToGo = (x, y) => Math.abs(x) + Math.abs(y);

module.exports = (input) => {
  let square = box = 1, x = 0, y = 0, dir = 0;
  do {
    switch (dir) {
      case 0:
        if (++x === box)
          dir++;
        break;

      case 1:
        if (++y === box)
          dir++;
        break;

      case 2:
        if (--x === -box)
          dir++;
        break;

      case 3:
        if (--y === -box) {
          dir = 0;
          box++;
        }
        break;
    }
  } while (++square < input);

  return stepsToGo(x, y);
}
