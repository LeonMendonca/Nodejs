import { Router } from 'express';
import { resolve,join } from 'path';

import { protector } from '../protectMiddleware.js'

const html = Router();

const absPath = resolve('./public')

html.get('/login',function(req,res){
  res.sendFile( join(absPath,'login.html') );
})

html.get('/terms-and-condition',function(req,res) {
  res.sendFile( join(absPath,'term-and-condition.html') )
})

html.get('/signup',function(req,res){
  res.sendFile( join(absPath,'signup.html') );
})

html.get('/profile',protector,function(req,res) {
  res.sendFile( join(absPath,'profile.html') );
})

html.get('/vote',function(req,res) {
  res.sendFile( join(absPath,'vote.html') );
})

export { html };
