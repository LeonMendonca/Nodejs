import { Router } from 'express'

import { result } from './handler.js'
import amountModel from '../db/models/amount.js'
import expenseModel from '../db/models/expense_entry.js'
import statsModel from '../db/models/stats.js'

import { GetExpenseById } from '../utils/dbops.js'

const ejsRoute = Router()

let amountObj = null //declared in a global scope to be exportable

function buildEjsRoute(app) {
  ejsRoute.get('/',async function(req,res) {
    amountObj = await amountModel.findOne()
    if(!amountObj) {
      return res.render('addAmount',{ warning:result })
    }
    const expensesArray = await expenseModel.find()
    //remove remaining amount from the cost spent
    let sum = 0; let remain = []
    for (let i in expensesArray) {
      sum = sum + expensesArray[i].amount
      let eachRemain = amountObj.inputAmount - sum
      remain.push(eachRemain)
    }
    //console.log(remain)

    //remove spent in percentage
    let percent = 100-(amountObj.remainAmount/(amountObj.inputAmount/100))
    const finalPercent = Math.round(percent * 100) / 100;

    //console.log(amountObj,finalPercent,"%")
    res.render('main',{ amount:amountObj,spentPercent:finalPercent, expenses:expensesArray, remainAmount:remain })
  })

  ejsRoute.get('/newentry',function(req,res) {
    res.render('new-entry',{ warning: result })
  })

  ejsRoute.get('/edit/:id',async function(req,res) {
    const expObj = await GetExpenseById(req.params.id)
    if(!expObj) {
      return res.json({error:"invalid id"})
    }
    //converting from Date to String
    const dateDb = expObj.date.toISOString().split('T')[0]
    //console.log("Date from db",dateDb)
    const objData = {
      Name:expObj.expenseName,
      Amount:expObj.amount,
      Description:expObj.description,
      Date:dateDb,
      Category:expObj.category
    }
    res.render('new-entry', { formData:objData, warning:result })
  })

  ejsRoute.get('/stats',async function(req,res) {
    const allStats = await statsModel.find()
    if(!allStats) {
      return res.render('stats', {stats:[]})
    }
    res.render('stats',{stats:allStats})
  })

  return ejsRoute
}

export { buildEjsRoute, amountObj }
