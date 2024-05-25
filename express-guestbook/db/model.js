import mongoose from 'mongoose'

var sub = new mongoose.Schema({
  title:String,
  content:String,
  published:Date
}, {_id:false})

var guestbook = new mongoose.Schema({
  name:String,
  arr:[sub] 
})

const Model = mongoose.model('records',guestbook)

export default Model
