import { Router } from 'express';
import { resolve, join } from 'path';
import { createUser } from '../utils/dbOps.js';

const reqHandler = Router();

reqHandler.post('/signup',async function(req,res) {
  try {
    const regDetail = req.body;
    await createUser(regDetail);
    res.json({uniqueName:true, uniqueEmail:true});
  } catch(error) {
    const regEx = /Duplicate entry '([^']+)' for key '([^']+)'/
    const match = error.message.match(regEx);
    const errorColumn = match[2].split('.')[1]
    if(errorColumn === 'username') { res.json({uniqueName:false, uniqueEmail:true}) }
    else { res.json({uniqueName:true, uniqueEmail:false}) };
  }
})

export { reqHandler }
