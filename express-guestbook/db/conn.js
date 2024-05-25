import mongoose from 'mongoose'
const uri = "mongodb://localhost:27017/guestbook"

mongoose.connect(uri)

const db = mongoose.connection

//module.exports = db
export default db

