import mongoose from 'mongoose'
const uri = "mongodb://localhost:27017/lam"

mongoose.connect(uri)

var db = mongoose.connection
//connect to db
function dbConnect() {
  db.once('open',function() {
    console.log('connected to db')
  })

  db.on('error',function() {
    console.log('failed to connect')
  })
}

export default dbConnect
