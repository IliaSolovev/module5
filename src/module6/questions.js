const readline = require("readline");

function Questions() {
  const answers = [];
  this.IO = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  this.askQuestion = function(q) {
    return new Promise((res, rej) => {
      this.IO.question(q, (answer) => {
        let nAnswer = parseInt(answer, 10);
        if (this.isValidAnswer(nAnswer)) {
          nAnswer = this.askQuestion("Enter correct answer: ");
        }
        answers.push(nAnswer);
        res(nAnswer);
      });
    });
  };
  this.sayAnswers = function() {
    console.log(answers);
  };
  this.isValidAnswer = function (answer) {
    return answer > 100 || answer < 0 || Number.isNaN(answer);
  }
}

module.exports = {
  Questions,
};
