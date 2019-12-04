import R from "ramda";

export default R.pipe(
  R.map(parseInt),
  R.map(mass => Math.floor(mass / 3) - 2),
  R.sum
);
