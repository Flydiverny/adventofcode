import R from "ramda";

const EXIT_CODE = 99;
const ADD = 1;
const MUL = 2;

export default rawData => {
  const intCode = R.pipe(
    R.map(R.split(",")),
    R.flatten,
    R.map(Number)
  )(rawData);

  // Patch intcode according to instructions
  intCode[1] = 12;
  intCode[2] = 2;

  let cursor = 0;
  const opLength = 4;

  while (cursor < intCode.length) {
    const [opCode, aIdx, bIdx, resultIdx] = R.slice(
      cursor,
      cursor + opLength,
      intCode
    );

    console.log(
      "Current Op",
      [opCode, aIdx, bIdx, resultIdx],
      "intCode",
      intCode
    );

    switch (opCode) {
      case ADD:
        intCode[resultIdx] = intCode[aIdx] + intCode[bIdx];
        break;
      case MUL:
        intCode[resultIdx] = intCode[aIdx] * intCode[bIdx];
        break;
      case EXIT_CODE:
        return intCode;
    }

    cursor += 4;
  }

  throw new Error("Program is over");
};
