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

export default formatQuestions
