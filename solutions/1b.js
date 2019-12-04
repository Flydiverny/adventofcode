import R from "ramda";

const calculateFuel = mass => {
  const fuel = Math.floor(mass / 3) - 2;
  if (fuel <= 0) {
    return 0;
  }

  return fuel + calculateFuel(fuel);
};

export default R.pipe(R.map(parseInt), R.map(calculateFuel), R.sum);
