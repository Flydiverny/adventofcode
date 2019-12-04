import Promise from "bluebird";

const inputPromise = new Promise((resolve, reject) => {
  if (process.stdin.isTTY) {
    return reject();
  }

  const stdin = process.stdin;
  const stdout = process.stdout;
  const inputChunks = [];

  stdin.resume();
  stdin.setEncoding("utf8");
  stdin.on("data", chunk => {
    inputChunks.push(chunk);
  });

  stdin.on("end", () => {
    resolve(inputChunks);
  });
});

export default inputPromise;
