import { getAllStorageInfo } from './setLocal'
import { toggleError, theError } from "./error.svelte";

//Main default fetch method
export default async function tryCatch(URL, modifier = "", method = "GET", headers = {} ) {
    try {
      const response = await fetch(URL + `${modifier}`, {
        method: method,
        headers: headers,
      });
      const data = await response.json();
	  //console.log(data)
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  //Gives main option categories
 export const giveCategories = async () => {
    const result = [];
    const categories = await tryCatch("https://opentdb.com/api_category.php");
    for (const category of categories.trivia_categories) {
      result.push([`${category.name}`, `${category.id}`]);
    }
    console.log(result);
    return result;
  };

  export const getQuestions = async () => {
    const currentStorage = getAllStorageInfo();
    console.log(currentStorage);
    let {
      numQuestions,
      categorySelect,
      difficulty,
      questionType,
    } = currentStorage[0];
    categorySelect = `&category=${categorySelect}`
    if (categorySelect === "&category=any") categorySelect = "";
    if (difficulty === "any") difficulty = "";
    if (questionType === "any") questionType = "";
    numQuestions = parseInt(numQuestions)
    let requestURL = `https://opentdb.com/api.php?amount=${numQuestions}${categorySelect}${difficulty}${questionType}&encode=url3986`;
    console.log("RequestURL", requestURL)
    let questions = await tryCatch(requestURL)
    if (questions.response_code === 1 || !questions.results.length) {
      console.log("Options too narrow, please broaden.")
      toggleError();
      
    }
    console.log(questions.results)
  };