import { createFormObject, markAsImp, validatePassword } from '../validateSignup.js';
import '../css/hide-arrows.css'
import '../css/red-color.css'
import '../css/signup-css.css'

const serverUrl = 'http://localhost:3000'

document.addEventListener('DOMContentLoaded',function() {
  document.getElementById("regBtn").addEventListener('click',async function(event) {
    event.preventDefault();

    let formObject = createFormObject(); 
    const isImp = markAsImp(formObject);
    //avoid below if Fields are empty
    if(isImp) { return }

    //check Confirm Password
    const isValid = validatePassword(formObject.password,formObject.confirmpassword);
    if(!isValid) { return }
    console.log(formObject);

    console.log('req server');
    const result = await fetch(`${serverUrl}/signup`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(formObject)
    })
    console.log(response);
    const response = JSON.parse(await result.text());

    /*
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
    */
  });
});
