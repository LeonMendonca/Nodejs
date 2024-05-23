import { Schema, model } from 'mongoose'

import { amountObj } from '../../routers/ejsroute.js'
import amountModel from './today_curr.js'

const expEntrySchema = new Schema({
  expenseName : { type:String, required:true, trim:true },
  amount :{ type:Number, required:true },
  date :{ type:Date },
  category : { type:String, required:true, trim:true },
  description : { type:String, trim:true },
}, { timestamps:true } )

expEntrySchema.pre('save',async function(next) {
  if(this.description == "") {
    this.description = "no description"
  }
  let remaining = amountObj.remainAmount - this.amount
  await amountModel.findOneAndUpdate({_id:amountObj._id},{ $set:{remainAmount:remaining} })
  next()
})

const expEntryModel = model("expenses",expEntrySchema)

export default expEntryModel
