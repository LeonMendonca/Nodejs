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
    formObject[name] = value.toString().trim();
  }
  return formObject;
}

function markAsImp(objectWithVal) {
  //boolean assuming that the form is filled correctly by default
  let boolean = false;
  for (let propWithVal in objectWithVal) {
    if(propWithVal === 'tnc') {
      if(objectWithVal[propWithVal] === 'true') {
        document.getElementById(propWithVal).classList.remove('color-red');
      } else {
        boolean = true;
        document.getElementById(propWithVal).classList.add('color-red');
      }
    } else if(propWithVal === 'password') {
      const password = objectWithVal[propWithVal];
      const length = password.length;
      //allows alphabets, numbers and special characters
      const regex = /^[a-zA-Z0-9!@#$%^&*(),.?":'{}|<>]*$/;
      if(length < 8 || length > 20 || !regex.test(password)) {
        boolean = true;
        document.getElementById(propWithVal).classList.add('color-red');
      } else {
        document.getElementById(propWithVal).classList.remove('color-red');
      }
    } else if (propWithVal === 'zipcode' || propWithVal === 'phonenumber' || propWithVal === 'aadharnumber') {
      const IntVal = parseInt(objectWithVal[propWithVal]);
      if(!isNaN(IntVal)) {
        document.getElementById(propWithVal).classList.remove('color-red');
      } else {
        boolean = true;
        document.getElementById(propWithVal).classList.add('color-red');
      }
    } else if(propWithVal === 'email') {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValid = regex.test(objectWithVal[propWithVal])
        if(isValid) { 
          document.getElementById('email').classList.remove('color-red');
        } else {
          boolean = true;
          document.getElementById('email').classList.add('color-red');
        }
    } else {
      if(objectWithVal[propWithVal] != "") {
        document.getElementById(propWithVal).classList.remove('color-red');
      } else {
        boolean = true;
        document.getElementById(propWithVal).classList.add('color-red');
      }
    } 
  }
  return boolean;
}

function validatePassword(password, confirmpassword) {
  if(password === confirmpassword) {
    document.getElementById('notmatch').innerHTML = "";
    return true;
  }
  document.getElementById('notmatch').innerHTML = "Password does not match";
  return false;
}

export { createFormObject, markAsImp, validatePassword };
