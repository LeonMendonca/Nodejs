import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  comment:{ type:String,required:true },
  blogId:{ type:mongoose.Schema.Types.ObjectId, ref:"blogs" },
  writtenBy:{ type:mongoose.Schema.Types.ObjectId, ref:"users" }
}, { timestamps:true })

const commentModel = mongoose.model('comments',commentSchema)

export default commentModel

