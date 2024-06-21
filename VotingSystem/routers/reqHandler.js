import { Router } from 'express';

const reqHandler = Router();

reqHandler.post('/signup',function(req,res) {
  const regDetail = req.body;
  /*
  
  if(!regDetail?.tnc) {
    newReg.tnc = false
  }
  if(!regDetail?.gender) {
    newReg.gender = false
  }
  console.log(regDetail);
  */
  res.json(regDetail);
})

export { reqHandler }
