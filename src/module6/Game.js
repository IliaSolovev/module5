const { IsCorrectAnswer } = require("./IsCorrectAnswer");
const { common } = require("./common");

function Game() {
  IsCorrectAnswer.call(this, common.randomInteger(1, 100));
  this.answer = "";
}
Game.prototype = Object.create(IsCorrectAnswer.prototype);
Game.prototype.askQuestion = common.memoize(Game.prototype.askQuestion);

Game.prototype.start = async function() {
  let { answer } = this;
  while (this.checkSteps()) {
    answer = await this.askQuestion("Enter number: ");
    if (this.checkCorrectAnswer(Number(answer))) {
      this.IO.close();
    }
    this.addStep();
  }
  this.IO.close();
};

module.exports = {
  Game,
};
