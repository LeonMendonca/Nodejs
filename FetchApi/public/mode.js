const url="http://localhost:3000"
async function Mode() {
  const mode = document.getElementById('dark').checked
  DarkLight(mode) 
  //console.log(mode)
  const result = await fetch(url, {
    method:'POST',
    headers:{ 'Content-type':'application/json' },
    body:JSON.stringify({isDark:mode}) //string required since JSON is needed
  })
  const response = await result.text()
  console.log(response)
}

document.addEventListener('DOMContentLoaded',(event) => {
  console.log("event",event)
  let isDark = getCookie()
  console.log("isdark",isDark)
  DarkLight(isDark) 
})

function DarkLight(bool) {
  if(bool) {
    document.getElementById('dark').checked = true;
    document.body.classList.add('dark-mode');
  } else {
    document.getElementById('dark').checked = false;
    document.body.classList.remove('dark-mode');
  }
}

function getCookie() {
  let mode = document.cookie.split('=')[1]
  mode = (mode === 'true')
  return mode
}
