
const fs = require('fs');
const Promise = require('bluebird');

module.exports = (fileName) => new Promise((resolve, reject) => {
  fs.readFile(fileName, (error, value) => (error ? reject(error) : resolve(value)));
}).then((input) => input.toString().trim());;
