const readline = require("readline");

function Questions() {
}

Questions.prototype = {
  rl: readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  }),
  askQuestion(q) {
    return new Promise((res, rej) => {
      this.rl.question(q, (answer) => {
        res(answer);
      });
    });
  },
};

module.exports = {
  Questions,
};
