import express from 'express'
import { resolve } from 'path'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.static(resolve('./public')))
//app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())

app.get('/',function(req,res) {
  res.render('index')
})

app.post('/',function(req,res) {
  console.log(req.body.isDark)
  res.cookie("darkmode",JSON.stringify(req.body.isDark),{sameSite:"Lax",secure:true}).send("cookie has been set")
})

app.use(function(req,res) {
  res.status(404).send("not found")
})

app.listen(3000,()=> {
  console.log("listening to port 3000")
})
