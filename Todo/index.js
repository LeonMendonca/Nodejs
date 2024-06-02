import express from 'express'
import { resolve } from 'path'

import { ejsRoute } from './routes/ejsroute.js'
import { reqHandler } from './routes/reqHandler.js'

import { MongoDbConnect } from './db/mongodb.js'
import { RedisDbConnect } from './db/redis.js'

const redis = await RedisDbConnect()

const app = express()

app.set('views',resolve('./views'))
app.set('view engine','ejs')

app.use(express.urlencoded({extended:false}))
app.use(express.static('./public'))

app.use('/',ejsRoute)
app.use('/',reqHandler)

async function Start() {
  try {
    await MongoDbConnect()
    app.listen(3000,()=>{
      console.log("connected to Mongodb\nlistening to port 3000")
    })
  } catch (error) {
    console.error(error.message)
  }
}

Start()

export { redis }
