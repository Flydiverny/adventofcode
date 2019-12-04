import fs from "fs";
import Promise from "bluebird";

export default fileName =>
  new Promise((resolve, reject) => {
    fs.readFile(fileName, (error, value) =>
      error ? reject(error) : resolve(value)
    );
  }).then(input => input.toString().trim());
