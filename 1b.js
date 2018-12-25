let freq = 0;
const mem = {};
const int = input
  .split("\n")
  .map(i => parseInt(i))
  .filter(i => !!i);

while (
  !int.find(i => {
    freq += i;
    mem[freq] = mem[freq] ? mem[freq] + 1 : 1;
    return mem[freq] > 1;
  })
) {}

console.log(freq);
