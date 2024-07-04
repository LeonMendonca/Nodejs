function createFormObject() {
  let formObject = new Object();
  const arrOfIds = ["uname","aadharno","pwd","rm"];
  let name, value = null;
  for(let id of arrOfIds) {
    name = document.getElementById(id).name;
    if(id === 'rm') {
      value = document.getElementById(id).checked;
    } else {
      value = document.getElementById(id).value; 
    }

    formObject[name] = value.toString().trim();
  }
  return formObject;
}

function markAsImp(propWithValue) {
  //indicating that nothing is left to mark as imp
  let boolean = false;
  for(let property in propWithValue) {
    if(property === 'aadharnumber') {
      if(propWithValue[property].length != 12) {
        boolean = true;
        document.getElementById(property).classList.add('color-red');
      } else {
        document.getElementById(property).classList.remove('color-red');
      }
    } else {
      if(propWithValue[property] == "" ) {
        boolean = true;
        document.getElementById(property).classList.add('color-red');
      } else {
        document.getElementById(property).classList.remove('color-red');
      }

    }
  }

  return boolean;
}


export { createFormObject, markAsImp };
