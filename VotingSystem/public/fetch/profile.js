const url = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded',async (event) => {
  const arrOfIds = [
    'firstname','lastname','username','email','phonenumber','dob','gender','currentaddress',
    'permanentaddress','state','taluka','district','zipcode','aadharnumber'
  ];
  event.preventDefault();
  const sessionid = sessionStorage.getItem('sid');
  const res = await fetch(`${url}/userprofile`,{
    method:'GET',
    headers:{'Authentication':`Bearer ${sessionid}`}
  });
  const response = await res.json();
  console.log(response.status);

  if(response.status) {
    const ProfileObject = response.status;
    for(let id of arrOfIds) {
      let element = document.getElementById(id);
      for(let property in ProfileObject) {
        if(element.id === property) {
          element.innerHTML = ProfileObject[property];
          break;
        }
      }
    } 
  }

  let error = null;
  if(response.error) {
    error = JSON.parse(response.error);
  }
  if(error?.authHeader === false) {
    window.location.href = `${url}/login`
  }
  if(error?.sessionId === false) {
    window.location.href = `${url}/login`
  }
  console.log('error',error);
  
})
/*
document.getElementById('voteBtn').addEventListener('click',() => {
  console.log('DOMContentLoaded');
})
*/
