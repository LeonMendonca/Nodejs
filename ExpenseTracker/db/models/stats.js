import { Schema, model} from 'mongoose'

const statSchema = new Schema({
  amount: {type:Number},
  spent : {type:String, trim:true},
}, {timestamps:true})

const statModel = model('stats',statSchema)

export default statModel
