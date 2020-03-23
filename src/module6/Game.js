const { Questions } = require("./questions");

function Game() {
  Questions.call(this);
  this.answer = "";
}
Game.prototype = Object.create(Questions.prototype);

Game.prototype.start = async function () {
  const { answer } = this;
  const range = this.createNumber((await this.askQuestion("Введите диапазон чисел (через запятую).").split(",")));
};

Game.prototype.createNumber = (min = 1, max = 100) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

module.exports = {
  Game,
};
