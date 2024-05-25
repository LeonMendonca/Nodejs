import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const uri = process.env.MONGODB_URI

function Connect() {
  mongoose.connect(uri)
  const db = mongoose.connection

  db.once('open',function() {
    console.log("connected to db")
  })
}

export default Connect
