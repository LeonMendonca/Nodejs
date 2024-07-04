import { createFormObject, markAsImp } from '../validateLogin.js';
import '../css/hide-arrows.css'
import '../css/red-color.css';

const url = "http://localhost:3000";

document.addEventListener('DOMContentLoaded',function(event) {
  event.preventDefault();
  document.getElementById('loginBtn').addEventListener('click',async ()=> {
    const formObject = createFormObject();
    let bool = markAsImp(formObject);
    //avoid requesting the server if form not filled
    if(bool) { return }
    let sid = sessionStorage.getItem('sid');
    const res = await fetch(`${url}/login`,{
      method:'POST',
      headers:{'Content-type':'application/json','Authentication':`Bearer ${sid}`},
      body:JSON.stringify(formObject),
    })
    const response = JSON.parse(await res.text());
    
    if(response.status) {
      console.log(response);
      //console.log( Object.fromEntries(res.headers)?.authentication);
      const authHeader = Object.fromEntries(res.headers)?.authentication;
      let sessionID = null;
      if(authHeader) {
        sessionID = authHeader.split(' ')[1];
        sessionStorage.setItem('sid',sessionID);
      }
      console.log("Session ID client",sessionID);
      window.location.href = `${url}/profile`;
    }

    let error = null;
    if(response.error) {
      console.log("error",response.error);
      error = JSON.parse(response.error)
    }
    //console.log("name",error?.uniquename)
    if(error?.uniquename === false) {
      document.getElementById('uniname').innerHTML = "Invalid username or email"
    } else {
      document.getElementById('uniname').innerHTML = ""
    }

    if(error?.aadharnumber === false) {
      document.getElementById('aadharnum').innerHTML = "Aadhar number doesn't match"
    } else {
      document.getElementById('aadharnum').innerHTML = ""
    }

    if(error?.password === false) {
      document.getElementById('pass').innerHTML = "Invalid password"
    } else {
      document.getElementById('pass').innerHTML = ""
    }

  })
})


