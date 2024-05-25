import { Schema, model } from 'mongoose'


const amountSchema = new Schema({
  inputAmount : { type:Number },
  remainAmount : { type:Number },
  currency : { type : String }
}, {timestamps:true})

amountSchema.pre('save',function(next) {
  this.remainAmount = this.inputAmount
  next()
})

const amountModel = model("amount",amountSchema)

export default amountModel
