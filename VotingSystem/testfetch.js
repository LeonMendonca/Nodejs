const serverUrl = 'http://localhost:3000'

const body = {
  aadharnumber: '983948938128',
  confirmpassword: 'leon2003',
  currentaddress: 'address',
  date: '2024-06-28',
  district: 'mumbai',
  email: 'leon@gmail.com',
  firstname: 'leon',
  lastname: 'mendonca',
  gender: 'male',
  password: 'leon2003',
  permanentaddress: 'address',
  phonenumber: '8309283928',
  state: 'mh',
  taluka: 'andheri',
  tnc: 'true',
  username: 'leon',
  zipcode: '943944',
  testData:"xdd",
  lol:true,
  number:9328,
}


const res = await fetch(`${serverUrl}/signup`,{
  method:'POST',
  headers:{'Content-type':'application/json'},
  body:JSON.stringify(body),
})
const response = await res.text();
console.log(JSON.parse(response));
