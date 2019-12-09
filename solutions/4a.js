import R from "ramda";

export default data => {
  const [lowStr, highStr] = data[0].split("-");
  const low = parseInt(lowStr);
  const high = parseInt(highStr);

  return R.filter(pw => {
    const pwArr = `${pw}`.split("");
    const isIncremental = !!pwArr.reduce((acc, curr) => {
      if (typeof acc === "boolean") {
        return acc;
      }

      if (acc <= curr) {
        return curr;
      }

      return false;
    });

    if (!isIncremental) {
      return false;
    }

    const { isPaired } = pwArr.reduce(
      ({ prev, isPaired }, curr) => {
        if (isPaired) {
          return { prev: curr, isPaired };
        }

        if (prev == curr) {
          return { prev: curr, isPaired: true };
        }

        return { prev: curr, isPaired: false };
      },
      { isPaired: false, prev: 0 }
    );

    if (!isPaired) {
      return false;
    }

    return true;
  })(R.range(low, high)).length;
};
