const readline = require("readline");

function Questions() {
  const answers = [];
  this.IO = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  this.askQuestion = function (q) {
    return new Promise((res, rej) => {
      this.IO.question(q, (answer) => {
        answers.push(answer);
        res(answer);
      });
    });
  };
  this.sayAnswers = function () {
    console.log(answers);
  };
}


module.exports = {
  Questions,
};
