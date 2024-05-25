import mongoose from 'mongoose'
const blogSchema = new mongoose.Schema({
  title:{type:String,required:true},
  content:{type:String,required:true},
  coverImage:{type:String},
  createdBy:{type:mongoose.Schema.Types.ObjectId, ref:'users'},
  name:{type:String}
},{ timestamps:true })

const blogModel = mongoose.model('blogs',blogSchema)

export default blogModel
