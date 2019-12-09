import R from "ramda";

const EXIT_CODE = 99;
const ADD = 1;
const MUL = 2;
const INPUT = 3;
const OUTPUT = 4;
const JP_TRUE = 5;
const JP_FALSE = 6;
const LT = 7;
const EQ = 8;

const INSTRUCTION_VALUES = {
  [ADD]: 4,
  [MUL]: 4,
  [EXIT_CODE]: 1,
  [INPUT]: 2,
  [OUTPUT]: 2,
  [JP_TRUE]: 3,
  [JP_FALSE]: 3,
  [LT]: 4,
  [EQ]: 4
};

const INPUT_VALUES = {
  [ADD]: 2,
  [MUL]: 2,
  [EXIT_CODE]: 0,
  [INPUT]: 0,
  [OUTPUT]: 1,
  [JP_TRUE]: 2,
  [JP_FALSE]: 2,
  [LT]: 2,
  [EQ]: 2
};

function createEventQueue() {
  const queuedEvents = [];
  const waitingResolvers = [];

  return {
    take: () =>
      queuedEvents.length > 0
        ? Promise.resolve(queuedEvents.shift())
        : new Promise(resolve => waitingResolvers.push(resolve)),
    put: msg =>
      waitingResolvers.length > 0
        ? waitingResolvers.shift()(msg)
        : queuedEvents.push(msg)
  };
}

const parseOpCode = opCode => {
  const [modStr, opStr] = R.splitAt(-2, `${opCode}`);
  const modsArr = modStr.split("");
  const op = parseInt(opStr);
  const paramModes = INPUT_VALUES[op] - modsArr.length;
  const refValues = Math.max(INSTRUCTION_VALUES[op] - 1 - INPUT_VALUES[op], 0);

  return [
    op,
    ...[]
      .concat(
        R.reverse(
          []
            .concat(paramModes > 0 ? R.repeat(false, paramModes) : [])
            .concat(modsArr.map(on => on === "1"))
        )
      )
      .concat(refValues > 0 ? R.repeat(true, refValues) : [])
  ];
};

const handleParameters = (parameters, parameterMode, memory) =>
  parameters.map((param, index) =>
    parameterMode[index] ? param : memory[param]
  );

const executeProgram = async function*(memory, inputQueue) {
  let pointer = 0;

  while (pointer < memory.length) {
    const opCode = memory[pointer];
    const [op, ...parameterMode] = parseOpCode(opCode);

    if (op === EXIT_CODE) return;

    const [_, ...rawParameters] = R.slice(
      pointer,
      pointer + INSTRUCTION_VALUES[op],
      memory
    );

    const parameters = handleParameters(rawParameters, parameterMode, memory);

    switch (op) {
      case ADD: {
        const [aParam, bParam, resultAddress] = parameters;
        memory[resultAddress] = aParam + bParam;
        break;
      }
      case MUL: {
        const [aParam, bParam, resultAddress] = parameters;
        memory[resultAddress] = aParam * bParam;
        break;
      }
      case INPUT: {
        const [aAddress] = parameters;
        memory[aAddress] = await inputQueue.take();
        break;
      }
      case OUTPUT: {
        const [aParam] = parameters;
        yield aParam;
      }
      case JP_TRUE: {
        const [aParam, bParam] = parameters;
        if (aParam !== 0) {
          pointer = bParam;
          continue;
        }
        break;
      }
      case JP_FALSE: {
        const [aParam, bParam] = parameters;
        if (aParam === 0) {
          pointer = bParam;
          continue;
        }
        break;
      }
      case LT: {
        const [aParam, bParam, resultAddress] = parameters;
        memory[resultAddress] = aParam < bParam ? 1 : 0;
        break;
      }
      case EQ: {
        const [aParam, bParam, resultAddress] = parameters;
        memory[resultAddress] = aParam === bParam ? 1 : 0;
        break;
      }
      case EXIT_CODE: {
        return;
      }
    }

    console.log(
      "orig",
      opCode,
      "parsed",
      [op, ...parameterMode],
      "raw param",
      rawParameters,
      "-> translated parameters",
      parameters
    );
    pointer += INSTRUCTION_VALUES[op];
  }
};

export default async rawData => {
  const memory = R.pipe(R.map(R.split(",")), R.flatten, R.map(Number))(rawData);

  const inputQueue = createEventQueue();
  inputQueue.put(5);

  const outputs = [];

  for await (const output of executeProgram(memory, inputQueue)) {
    outputs.push(output);
  }

  return outputs;
};
