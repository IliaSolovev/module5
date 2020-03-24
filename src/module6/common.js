const { memoize } = require("../module5/index");

const common = {
  randomInteger(min, max) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  },
  memoize,
};
module.exports = {
  common,
};
