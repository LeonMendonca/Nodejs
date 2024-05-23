import express from 'express'

import { signUp, login} from '../utils/login-signup.js'


const auth = express.Router()

function buildAuthRoutes(app) {
  auth.post('/signup',async function(req,res) {
    const signUpData = req.body
    console.log(req.body)
    try {
      await signUp(signUpData)
      app.locals.emailTaken = false
      res.redirect('/signup')
    } catch (error) {
      console.log(error.message)
      app.locals.emailTaken = true
      res.redirect('/signup')
    }
  })

  auth.post('/login',async function(req,res) {
    const loginData = req.body
    try {
      const user = await login(loginData)
      if(!user) {
        app.locals.loginStat = null
        return res.redirect('/login')
      } else if (!user.isValid) {
        app.locals.loginStat = false
        return res.redirect('/login')
      }
      app.locals.loginStat = true
      //console.log("current user:",app.locals.currentUser)
      res.cookie('token',user.token).redirect('/')
    } catch (error) {
      console.log(error.message)
    }
  })

  return auth
}

export default buildAuthRoutes
