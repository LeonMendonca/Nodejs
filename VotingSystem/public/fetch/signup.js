const serverUrl = 'http://localhost:3000'

function createFormObject() {
  let formObject = new Object();
  const arrOfIds = [
    "fname","lname","gen","dt","uname","pwd","conf-pwd","curraddr","peraddr",
    "zcode","st","tlk","dist","aadhno","phno","em","tc"
  ];

  let name, value;
  for (let id of arrOfIds) {
    name = document.getElementById(id).name;
    if(id === 'tc') {
      value = document.getElementById(id).checked;
    } else {
      value = document.getElementById(id).value;
    }
    formObject[name] = value
  }
  return formObject;
}

function checkInput(object) {
  let newReg;
  newReg = Object.assign({},newReg,object);
  for (let property in object) {
    //tnc has default boolean value
    if(property === 'tnc') {
      continue;
    }
    //convert to string, cuz of trim()
    if(object[property].toString().trim() != "") {
      newReg[property] = true;
    } else {
      newReg[property] = false;
    }
  }
  return newReg;
}

function markAsImp(objectWithBool) {
  for (let propWithBool in objectWithBool) {
    //console.log(propWithBool,objectWithBool[propWithBool],document.getElementById(propWithBool));
    if(objectWithBool[propWithBool]) {
      document.getElementById(propWithBool).classList.remove('color-red');
    } else {
      document.getElementById(propWithBool).classList.add('color-red');
    }
  }

  /*
  if (inputField.value.trim() === "") {
    console.log("add red border");
    inputField.classList.add('bg-color');
  } else {
    console.log("remove red border");
    inputField.classList.remove('bg-color');
  }
  */
}

document.addEventListener('DOMContentLoaded',function() {
  document.getElementById("regBtn").addEventListener('click',async function() {
    let formObject = createFormObject(); 
    let formResult = checkInput(formObject);
    //console.log(formResult);
    markAsImp(formResult);
    /*
    const result = await fetch(`${serverUrl}/signup`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(formObject)
    })
    let res = await result.text();
    console.log(res);
    */
  });
});
