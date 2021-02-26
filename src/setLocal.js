import tryCatch from "./api"

export const setOptions = (form) => {
  form.preventDefault();
  try {
  } catch (err) {
    throw new Error(err.message);
  }
};

export const buildJsonFormData = (form) => {
  //console.log("Form is:", form);
  const jsonFormData = {};
  for (const pair of new FormData(form)) {
    jsonFormData[pair[0]] = pair[1];
  }
  return jsonFormData;
};

export const getAllStorageInfo = () => {
  let getInfoById = (id) => {
    let theItem = JSON.parse(localStorage.getItem(id));
    return theItem;
  };
  let infoArray = [];
  for (const key in localStorage) {
    infoArray.push(getInfoById(key));
  }
  let noNulls = infoArray.filter((object) => object !== null);
  return noNulls;
};

export const requestTrivia = () => {
    
}