export const setOptions = (form) => {
  try {
    localStorage.setItem("Settings", form)
  } catch (err) {
    throw new Error(err.message);
  }
};

export const buildJsonFormData = (form) => {
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

