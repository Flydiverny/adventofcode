import R from "ramda";

export default data =>
  R.pipe(
    R.map(parseInt),
    R.map(x => x / 3),
    R.map(Math.floor),
    R.map(x => x - 2),
    R.sum
  )(data);
