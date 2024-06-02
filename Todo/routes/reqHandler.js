import { Router } from 'express'

import { CreateTask, UpdateTask } from '../utils/mongodbQuery.js'
import { FindTask, UpdateRedisTask, DeleteRedisCacheTask } from '../utils/redisQuery.js'

const reqHandler = Router()

//wrapping it in an object so that it can be overwritten by methods that import it
const modifiedStat = {
  isModified:false
}

reqHandler.post('/',async function(req,res) {
  const task = req.body.task.trim()
  if(!task) {
    return res.status(400).send("task is required")
  }
  await CreateTask(task)
  res.redirect('/')
})

reqHandler.get('/mark/:taskid',async function(req,res) {
  modifiedStat.isModified = true
  const taskId = req.params.taskid.trim()
  const { foundtask, idx } = await FindTask(taskId)
  if(!foundtask) {
    return res.status(400).json({ error:"Something went wrong" })
  }
  await UpdateRedisTask(foundtask, idx)
  console.log("reqhandler /mark/id",foundtask, idx)
  //res.status(200).json({"response":foundtask, idx})
  res.redirect('/')
})

reqHandler.get('/save',async function(req,res) {
  modifiedStat.isModified = false
  const arr = await UpdateTask()
  res.redirect('/')
})

reqHandler.get('/discard',async function(req,res) {
  await DeleteRedisCacheTask()
  res.redirect('/')
})

export { reqHandler, modifiedStat }
