//Main default fetch method
export default async function tryCatch(URL, modifier = "", method = "GET", headers = {} ) {
    try {
      const response = await fetch(URL + `${modifier}`, {
        method: method,
        headers: headers,
      });
      const data = await response.json();
	  console.log(data)
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