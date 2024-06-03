import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const uri = process.env.MONGODB_URI

function Connect() {
  return mongoose.connect(uri)
}

export default Connect
