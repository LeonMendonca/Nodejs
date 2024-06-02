import { redis } from '../index.js'
import { mongoDbquery } from './mongodbQuery.js'
import { modifiedStat } from '../routes/reqHandler.js'

async function CreateRedisTask(task) {
  console.log(task)
  try {
    const jsonAppend = await redis.call('json.arrappend','alltasks','.',JSON.stringify(task))
    console.log("try from create redis",jsonAppend)
  } catch (error) {
    const jsonset = await redis.call('json.set','alltasks','.',`[${JSON.stringify(task)}]`)
    console.log("catch from create redis",jsonset)
  }
}

async function SetRedisAllTasks(alltasks) {
  const jsonSet = await redis.call('json.set','alltasks','.',JSON.stringify(alltasks))
  console.log("set redis",jsonSet) 
}

async function GetRedisAllTasks() {
  const jsonArr = await redis.call('json.get','alltasks','.')
  return JSON.parse(jsonArr)
}

async function FindTask(taskId) {
  const jsonArr = await redis.call('json.get','alltasks','.')
  const taskArr = JSON.parse(jsonArr)
  let foundtask, idx = -1
  taskArr.forEach(function(task, index) {
    if(task._id === taskId) {
      foundtask = task
      idx = index
    }
  })
  return { foundtask, idx }
  
}

async function UpdateRedisTask(task, idx) {
  task.isDone = task.isDone ? false : true
  const jsonSet = await redis.call('json.set','alltasks',`[${idx}].isDone`,`${task.isDone}`)
  console.log("update redis",task, jsonSet)
  //save the state of changes made to a task, in hmap, and create a list of ids that have been changed
  const hset = await redis.hset(`changes:${task._id}`,task)
  if(hset != 0) {
    await redis.lpush('changesId',task._id)
  }
  console.log("value of hset",hset)
  //const hgetall = await redis.hgetall(`changes:${task._id}`)
  //console.log(hset,"hgetall" ,hgetall)
}

async function DeleteRedisCacheTask() {
  mongoDbquery.query = false
  modifiedStat.isModified = false
  const lrange = await redis.lrange('changesId',0,-1)
  for (let id of lrange) {
    let del = await redis.del(`changes:${id}`)
    console.log(del)
  }
  await redis.del('changesId')
}

export { SetRedisAllTasks, GetRedisAllTasks, CreateRedisTask, FindTask, UpdateRedisTask, DeleteRedisCacheTask }
