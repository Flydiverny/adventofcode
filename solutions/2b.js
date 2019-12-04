import R from "ramda";

const EXIT_CODE = 99;
const ADD = 1;
const MUL = 2;

const INSTRUCTION_VALUES = {
  [ADD]: 4,
  [MUL]: 4,
  [EXIT_CODE]: 1
};

const handleInstruction = ([opCode, ...parameters], memory) => {
  switch (opCode) {
    case ADD: {
      const [aAddress, bAddress, resultAddress] = parameters;
      memory[resultAddress] = memory[aAddress] + memory[bAddress];
      break;
    }
    case MUL: {
      const [aAddress, bAddress, resultAddress] = parameters;
      memory[resultAddress] = memory[aAddress] * memory[bAddress];
      break;
    }
  }

  return memory;
};

const executeProgram = memory => {
  let pointer = 0;

  while (pointer < memory.length) {
    const opCode = memory[pointer];

    if (opCode === EXIT_CODE) return memory;

    const instruction = R.slice(
      pointer,
      pointer + INSTRUCTION_VALUES[opCode],
      memory
    );

    handleInstruction(instruction, memory);

    pointer += 4;
  }

  return memory;
};

const SEARCHING_FOR = 19690720;
export default rawData => {
  const freshMemory = R.pipe(
    R.map(R.split(",")),
    R.flatten,
    R.map(Number)
  )(rawData);

  for (let noun = 0; noun < 99; noun++) {
    for (let verb = 0; verb < 99; verb++) {
      const memory = [...freshMemory];
      memory[1] = noun;
      memory[2] = verb;

      const [target] = executeProgram(memory);

      if (target === SEARCHING_FOR) {
        console.log("found target");
        return memory;
      }
    }
  }

  throw new Error("Program is over");
};
