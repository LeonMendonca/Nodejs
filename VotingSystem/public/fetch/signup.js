const serverUrl = 'http://localhost:3000'

document.addEventListener('DOMContentLoaded',function() {
  //const arrId = [""];
  document.getElementById("regBtn").addEventListener('click',async function() {
    console.log(document.getElementById('username').value);
    const result = await fetch(`${serverUrl}/signup`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({res:"hello world"})
    })
    let res = await result.text();
    console.log(res);
  });
});
