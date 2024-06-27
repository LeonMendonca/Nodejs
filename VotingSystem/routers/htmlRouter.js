import { Router } from 'express';
import { resolve,join } from 'path';

const html = Router();

const absPath = resolve('./dist')

html.get('/login',function(req,res){
  res.sendFile( join(absPath,'login.html') );
})

html.get('/terms-and-condition',function(req,res) {
  res.sendFile( join(absPath,'term-and-condition.html') )
})

html.get('/signup',function(req,res){
  res.sendFile( join(absPath,'signup.html') );
})

export { html };
