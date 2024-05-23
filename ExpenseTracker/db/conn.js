import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const uri = process.env.MONGODB_URI

function Connect() {
  return mongoose.connect(uri)
}

export default Connect
