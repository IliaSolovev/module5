const { IsCorrectAnswer } = require("./IsCorrectAnswer");
const { randomInteger } = require("./common");

function Game() {
  IsCorrectAnswer.call(this, randomInteger(1, 100));
  this.answer = "";
}
Game.prototype = Object.create(IsCorrectAnswer.prototype);

Game.prototype.start = async function () {
  let { answer } = this;
  while (this.checkSteps()) {
    answer = await this.askQuestion("Введите число: ");
    if (this.checkCorrectAnswer(Number(answer))) {
      this.rl.close();
    }
    this.addStep();
  }
  this.rl.close();
};

module.exports = {
  Game,
};
