const { Questions } = require("./questions");

const question = new Questions();

(async function main() {
  let answer;
  if (answer === undefined) {
    answer = await question.askQuestion("Do you play with me? ");
  }
  while (answer !== "Yes" && answer !== "No") {
    answer = await question.askQuestion("Please, write correct! ");
  }
  if (answer === "Yes") {
    console.log(`Ooooo, ${answer}`);
  } else {
    console.log("hmmm, ok...");
    question.rl.close();
  }
}());
