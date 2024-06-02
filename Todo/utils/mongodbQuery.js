import { taskModel } from '../db/schema-model/task.js'
import { redis } from '../index.js'
import { SetRedisAllTasks, GetRedisAllTasks, CreateRedisTask } from './redisQuery.js'

//wrapping it in an object so that it can be overwritten by methods that import it
const mongoDbquery = {
  query:false
}
let alltasks = []

async function CreateTask(stringTask) {
  try {
    const newtask = await taskModel.create({task:stringTask})
    await CreateRedisTask(newtask)
    return newtask
  } catch(error) {
    throw error
  }
}

async function GetAllTasks() {
  try {
    if(mongoDbquery.query) {
      console.log("from redis")
      alltasks = await GetRedisAllTasks()
      console.log("redis",alltasks)
      return alltasks
    } 
    console.log("from mongo")
    alltasks = await taskModel.find()
    //console.log(alltasks)
    await SetRedisAllTasks(alltasks) 
    mongoDbquery.query = true
    return alltasks

  } catch(error) {
    throw error
  }
}

async function UpdateTask() {
  const lrange = await redis.lrange('changesId',0,-1)
  for (let id of lrange) {
    let hget = await redis.hget(`changes:${id}`,'isDone')
    console.log(id,hget)
    await taskModel.findOneAndUpdate({_id:id},{$set:{isDone:hget}})
  }
  return lrange
}

export { CreateTask, GetAllTasks, UpdateTask, mongoDbquery }
