import express from 'express'
const authRoute = express.Router()

import {Signup, Login} from '../utils/login-signup.js'

//wrap the routes/middleware inside a function, with a parameter for express app, return the route, and export it
function buildRoutes(app) {
  authRoute.post('/signup',async function(req,res) {
    //res.send(req.body)
    const userData = req.body
    const signupCon = await Signup(userData)
    if(signupCon) {
      app.locals.signup = true
      res.redirect('/signup')
    } else {
      app.locals.signup = false
      res.redirect('/signup')
    }
  })

  authRoute.post('/login', async function(req,res) {
    const userData = req.body
    const loginCon = await Login(userData)
    if(!loginCon) {
      app.locals.login = null
      console.log('no user found')
      return res.redirect('/login')
    }
    if(loginCon.isValid) {
      //app.locals.currentUser = {username:loginCon.userDetail.username, id:loginCon.userDetail._id}
      app.locals.currentUser = loginCon.userDetail
      //console.log(app.locals.currentUser.username)
      app.locals.login = true
      res.redirect('/')
    } else {
      app.locals.login = false
      res.redirect('/login')
      //res.send('Invalid cred')
    }
    //res.send(req.body)
  })

  return authRoute
}
export default buildRoutes
