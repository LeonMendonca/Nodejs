import { Router } from 'express';

const ejs = Router();

ejs.get('/',function(req,res){
  res.render('index');
})

export { ejs };
