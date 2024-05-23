import mongoose from 'mongoose'
const uri = "mongodb://localhost:27017/blog"

function Connect() {
  mongoose.connect(uri)
  const db = mongoose.connection

  db.once('open', function() {
    console.log("connected to db")
  })
  db.on('error', function() {
    console.log("failed to connect")
  })
}

export default Connect
