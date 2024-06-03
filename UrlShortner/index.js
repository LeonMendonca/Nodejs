import express from 'express'
import path from 'path'

import Connect from './db/conn.js' 
import route from './routes/url.js'


const app = express()

app.set('views',path.resolve('./views'))
app.set('view engine', 'ejs')

//built-in m/w
app.use(express.static(path.resolve('./public')))
app.use(express.urlencoded({extended:false}))

//user defined m/w
app.use('/',route)

//invalid route handler
app.use(function(_,res) {
  res.status(404).end('404')
})

async function Start() {
  try {
    await Connect()
    app.listen(3000,()=> {
      console.log("connected to mongoDb\nlistening to port 3000")
    })
  } catch (error) {
    console.log(error.message)
  }
}
Start()

