const formatQuestions = (questionsData) => {
  let resultArray = [];
  questionsData.results.forEach((result) => {
     //console.log(result);
    if (result.type === "boolean") {
      let resultObject = {};
      resultObject["category"] = unescape(result.category);
      resultObject["question"] = unescape(result.question);
      resultObject["correctAnswer"] = unescape(result.correct_answer);
      resultObject["incorrectAnswer"] = result.incorrect_answers[0];
      resultObject["type"] = "boolean";
      resultObject["difficulty"] = unescape(result.difficulty)
      resultArray.push(resultObject);
    } else {
      let resultObject = {};
      resultObject["category"] = unescape(result.category);
      resultObject["question"] = unescape(result.question);
      resultObject["difficulty"] = unescape(result.difficulty)
      resultObject["type"] = "multiple";
      let answerArray = [];
      answerArray.push({
        answer: `${unescape(result.correct_answer)}`,
        correct: true,
      });
      result.incorrect_answers.forEach((answer) => {
        answerArray.push({ answer: `${unescape(answer)}`, correct: false });
      });
      resultObject["answers"] = answerArray;
      resultArray.push(resultObject);
    }
    //console.log("Result array:", resultArray);
    
  });
  return resultArray;
};

export const shuffle = (array) => {
  array.sort(() => Math.random() - 0.5);
  return array;
};
export const rightAnswer = () => {
  alert("You are correct!");
  questionNum += 1;
  score += 1;
};
export const wrongAnswer = () => {
  alert("Nope, sorry.");
  questionNum += 1;
};

export function flipCoin() {
  return Math.floor(Math.random() * 2 + 1);
}

export const randomNamePicker = () => {
  const nameList = [
    "Lazy",
    "Rebel",
    "Nameless",
    "Fast Clicker",
    "Quickdraw",
    "Shooter McGavin",
    "Nobody",
    "Stranger",
    "Personage of Mystery",
    "Quick Hand Joe",
    "They-who-won't-be-Named"
  ];
  const lazyName = nameList[Math.floor(Math.random() * nameList.length)];
  return lazyName;
};

export default formatQuestions
