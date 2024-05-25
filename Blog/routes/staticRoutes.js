import express from 'express'

import blogModel from '../db/blogModel.js'

const sRoute = express.Router()

function buildRoutes(app) {
  sRoute.get('/',async function(req,res) {
    //console.log(req.user)
    app.locals.blogs = await blogModel.find()
    return res.status(200).render('home')
  })

  sRoute.get('/signup',function(req,res) {
    //console.log(req.user)
    return res.status(200).render('signup')
  })

  sRoute.get('/login',function(req,res) {
    //console.log(req.user)
    return res.status(200).render('login')
  })

  sRoute.get('/logout',function(req,res) {
    app.locals.currentUser = null
    return res.status(302).clearCookie('token').render('logout')
  })


  
  return sRoute
}

export default buildRoutes
