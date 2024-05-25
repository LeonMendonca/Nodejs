import mongoose from 'mongoose'

const urlSchema = new mongoose.Schema({
  shortId:{type:String, required:true, unique:true},
  orgUrl:{type:String, required:true}
}, { timestamps:true } )

const urlModel = mongoose.model("shorturls",urlSchema)

export default urlModel
