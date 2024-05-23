import express  from 'express'
import logger  from 'morgan'
import path  from 'path'
import cookie  from 'cookie-parser'
import cors  from 'cors'

import Connect  from './db/conn.js'
import auth  from './routes/auth.js'
import checkToken  from './utils/checkToken.js'
import staticRoute  from './routes/staticRoutes.js'
import upload  from './routes/fileUpload.js'
import blogRoute  from './routes/blogRoute.js'
import profile  from './routes/profile.js'

Connect()

const app = express()

//local variables for ejs
app.locals.emailTaken = undefined //email is taken or not is not defined yet
app.locals.loginStat = undefined //user logged in or not is not defined yet
app.locals.currentUser = undefined //no logged in user yet
app.locals.blogs

app.use(logger('dev'))
app.use(cookie())
app.use(cors({
  origin: 'http://localhost:3000', // Specify allowed origin
  methods: ['GET', 'POST'],      // Specify allowed HTTP methods
  allowedHeaders: ['Content-Type'] // Specify allowed headers
}));

const publicPath = path.resolve('./public')
app.use(express.static(publicPath))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(checkToken(app))
app.use('/',staticRoute(app))
app.use('/auth',auth(app))
app.use('/',upload(app))
app.use('/profile',profile(app))
app.use('/blog',blogRoute(app))

app.set('views', path.resolve('./views'))
app.set('view engine', 'ejs')


app.use(function(req,res) {
  console.log(req.user)
  res.status(404).render('404')
})

app.listen(3000, ()=> {
  console.log("listening to port 3000")
})
