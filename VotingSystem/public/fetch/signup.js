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
    formObject[name] = value.toString().trim();
  }
  return formObject;
}

/*
unused
function checkInput(object) {
  let newReg;
  newReg = Object.assign({},newReg,object);
  for (let property in object) {
    //tnc has default boolean value
    if(property === 'tnc') {
      continue;
    }
    //convert to string, cuz of trim()
  }
  return newReg;
}
*/

function markAsImp(objectWithVal) {
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

function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

document.addEventListener('DOMContentLoaded',function() {
  document.getElementById("regBtn").addEventListener('click',async function(event) {
    event.preventDefault();

    let formObject = createFormObject(); 
    const isImp = markAsImp(formObject);
    //avoid below if Fields are empty
    if(isImp) { return }
    //console.log(formObject);
    //validate more...
    const isValid = validatePassword(formObject.password,formObject.confirmpassword);
    const isValidEmail = validateEmail(formObject.email);
    if(!isValid || !isValidEmail) { return }
    console.log('req server');
    const result = await fetch(`${serverUrl}/signup`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(formObject)
    })
    const response = JSON.parse(await result.text());

    if(!response.uniqueName) {
      document.getElementById('usernametaken').innerHTML = "This username has been taken"
    } else {
      document.getElementById('usernametaken').innerHTML = ""
    }
    if(!response.uniqueEmail) {
      document.getElementById('emailtaken').innerHTML = "This email has been taken"
    } else {
      document.getElementById('emailtaken').innerHTML = ""
    }

    if(response.uniqueName && response.uniqueEmail) {
      window.location.href = `${serverUrl}/login`;
    }
  });
});
