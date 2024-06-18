import { Router } from 'express';

const reqHandler = Router();

reqHandler.post('/signup',function(req,res) {
  const regDetail = req.body;
  let newReg;
  newReg = Object.assign({},newReg,regDetail);
  for (let property in regDetail) {
    if(regDetail[property].trim() != "") {
      newReg[property] = true;
    } else {
      newReg[property] = false;
    }
  }
  if(!regDetail?.tnc) {
    newReg.tnc = false
  }
  if(!regDetail?.gender) {
    newReg.gender = false
  }
  console.log(regDetail);
  res.json(newReg);
})

export { reqHandler }
