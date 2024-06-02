import { Schema, model } from 'mongoose'

const taskSchema = new Schema({
  task:{ type:String, required:true, trim:true },
  isDone:{ type:Boolean, default:false }
})

const taskModel = model("tasks",taskSchema)

export { taskModel }
