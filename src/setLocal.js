export const setDefaultOptions = (form) => {
  localStorage.setItem("Settings", JSON.stringify(form));
  console.log("Local storage says:", getAllStorageInfo());
};

export const buildJsonFormData = (form) => {
  const jsonFormData = {};
  for (const pair of new FormData(form)) {
    jsonFormData[pair[0]] = pair[1];
  }
  return jsonFormData;
};

export const setOptions = (form) => {
  const formData = buildJsonFormData(form);
  console.log("Form info", JSON.stringify(formData));
  localStorage.setItem("Settings", JSON.stringify(formData));
  console.log("Local storage says:", getAllStorageInfo());
  
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

