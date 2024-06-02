import { Router } from 'express'

import { GetAllTasks } from '../utils/mongodbQuery.js'
import { modifiedStat } from './reqHandler.js'

const ejsRoute = Router()

ejsRoute.get('/',async function(req,res) {
  const alltasks = await GetAllTasks()
  if(!alltasks) {
    return res.render('index',{tasks:[], modified:modifiedStat.isModified})
  }
  //console.log(alltasks)
  res.render('index',{ tasks: alltasks, modified:modifiedStat.isModified })
})

export { ejsRoute }

