const { Questions } = require("./questions");

function Steps(maxStep = 5) {
  Questions.call(this);
  this.currentSteps = 0;
  this.maxStep = maxStep;
}

Steps.prototype = Object.create(Questions.prototype);

Steps.prototype.addStep = function () {
  this.currentSteps += 1;
};

Steps.prototype.checkSteps = function () {
  return this.currentSteps < this.maxStep;
};

module.exports = {
  Steps,
};
