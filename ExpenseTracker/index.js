//built in modules import
import express from 'express'
import logger from 'morgan'
import path from 'path'

//js file import
import { buildEjsRoute } from './routers/ejsroute.js'
import { buildHandlerRoute } from './routers/handler.js'

import Connect from './db/conn.js'


const app = express()

//local variable
app.locals.formData = {}

//set view engine
app.set('views', path.resolve('./views'))
app.set('view engine', 'ejs')

//use buit in m/w
app.use(logger('dev'))
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.resolve('./public')))

//my m/w
app.use('/',buildEjsRoute(app))
app.use('/',buildHandlerRoute(app))

//handles undefined routes
app.use(function(_,res) {
  res.status(404).end("404 not found")
})

async function Start() {
  try {
    await Connect()
    app.listen(3000,()=> {
      console.log("listening to port 3000")
      console.log("connected to DB")
    })
  } catch (error) {
    console.log(error.message)
  }
}

Start()
