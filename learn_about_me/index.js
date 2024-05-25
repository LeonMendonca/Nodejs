//built-in modules
import express from 'express'
import logger from 'morgan'
import path from 'path'
import cookieParser from 'cookie-parser'


import dbconn from './db/conn.js'
import routes from './routes/staticRoutes.js'
import auth from './routes/auth.js'

dbconn()

var app = express()

app.locals.signup = undefined
app.locals.login = undefined
//app.locals.currentUser = {username:undefined,id:undefined}
app.locals.currentUser = null 

app.set('views',path.resolve('./views'))
app.set('view engine', 'ejs')

app.use(logger("dev"))
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))

app.use('/',routes(app))
app.use('/auth',auth(app))

app.use(function(req,res) {
  res.status(404).render('404')
})

app.listen(3000,()=>{
  console.log("listening to port 3000")
})
