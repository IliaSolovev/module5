const readline = require("readline");

function Questions() {
  this.answers = [];
}

Questions.prototype = {
  rl: readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  }),
  askQuestion(q) {
    return new Promise((res, rej) => {
      this.rl.question(q, (answer) => {
        this.answers.push(answer);
        res(answer);
      });
    });
  },
  sayAnswers() {
    console.log(this.answers);
  },
};

module.exports = {
  Questions,
};
