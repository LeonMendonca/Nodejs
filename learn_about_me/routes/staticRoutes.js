import express from 'express'

import getUser from '../utils/getUser.js'
import findOne from '../utils/userProfile.js'
import Edit from '../utils/editProfile.js'

const staticRoutes = express.Router()
function buildRoutes(app) {
  staticRoutes.get('/',async function(req,res) {
    var allUsers = await getUser()
    res.render('home',{ users:allUsers })
  })

  staticRoutes.get('/signup',function(req,res) {
    res.render('signup')
  })

  staticRoutes.get('/login',function(req,res) {
    res.status(200).render('login')
  })

  staticRoutes.get('/logout',function(req,res) {
    app.locals.currentUser = null
    res.redirect('/')
  })
  
  staticRoutes.get('/users/:id',async function(req,res) {
    const oneUser = await findOne(req.params.id)
    if(!oneUser) {
      return res.status(404).render('404')
    }
    //console.log(oneUser)
    //res.send(req.params.id)
    res.render('profile',{ user:oneUser })
  })

  staticRoutes.get('/edit',function(req,res) {
    if(!app.locals.currentUser) {
      console.log("You are not logged in")
      return res.redirect('/login')
    }
    res.render('edit')
  })

  staticRoutes.post('/edit',async function(req,res) {
    let userData = req.body
    let currentUser = app.locals.currentUser.username
    await Edit(userData, currentUser)

    app.locals.currentUser.bio = userData.bio
    app.locals.currentUser.displayName = userData.displayname
    res.redirect('/edit')
  })

  return staticRoutes

}

export default buildRoutes
