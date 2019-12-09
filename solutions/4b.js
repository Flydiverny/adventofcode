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

    const pairs = pwArr.reduce((acc, curr, idx) => {
      return {
        ...acc,
        [curr]: (acc[curr] || 0) + (curr === pwArr[idx - 1] ? 1 : 0)
      };
    }, {});

    const singlePair = Object.values(pairs).find(x => x === 1);

    if (!singlePair) {
      return false;
    }

    return true;
  })(R.range(low, high)).length;
};
