import { Router } from 'express'

import { CreateAmt, CreateExpense, CheckAmount, ChangeAmount, DeleteExpenseAndUpdateAmount, CreateStat } from '../utils/dbops.js'
import { amountObj } from './ejsroute.js'

const handler = Router()

let result = undefined

function ValidateAmount(amount) {
  if(amount > amountObj.remainAmount) {
    result = `Balance is ${amountObj.remainAmount}, cannot spend more ${amount}`
    return false
  }
  return true
}

function ValidateInput(reqBodyObj) {
  for(let key in reqBodyObj) {
    if(key == 'description') {
      continue
    }
    if(!reqBodyObj[key]) {
      result = "Pls fill out the required fields"
      return false
    }
  }
  return true
}

function ValidateSign(num) {
  let value = Math.sign(num)
  if(value == -1) {
    return true
  } else if (value == 1) {
    return false
  } else {
    return false
  }
}

function buildHandlerRoute(app) {
  //redirect to home if amount is undefined
  handler.use(function(req,res) {
    if(!amountObj) {
      res.redirect('/')
    }
  })
  //handler the Amount
  handler.post('/',async function(req,res) {
    let userIn = req.body
    if(userIn.inputAmount < 500) {
      result = "Amount must be atleast 500"
      return res.redirect('/')
    }
    if(!userIn.currency) {
      result = "Please select a currency type"
      return res.redirect('/')
    }
    let symbol = userIn.currency.split(' ')[0] //extract symbol
    userIn.currency = symbol //assign symbol
    result = undefined
    await CreateAmt(userIn)
    res.redirect('/')
  })

  // Add expense
  handler.post('/newentry',async function(req,res) {
    const userEntry = req.body
    app.locals.formData = {
      Name:userEntry.expenseName,
      Amount:userEntry.amount,
      Description:userEntry.description,
      Date:userEntry.date,
      Category:userEntry.category
    }
    
    let boolValinput = ValidateInput(userEntry)
    let boolValamt = ValidateAmount(userEntry.amount)
    if(!boolValinput || !boolValamt) {
      return res.redirect('/newentry')
    }
    //once validation of form is completed, then reset the formData, and result
    app.locals.formData = {}
    result = undefined

    const obj = await CreateExpense(userEntry)
    console.log("object exp",obj)
    res.redirect('/')
  })

  // Edit an expense
  handler.post('/edit/:id',async function(req,res) {
    const edituserEntry = req.body
    const objData = {
      Name:edituserEntry.expenseName,
      Amount:edituserEntry.amount,
      Description:edituserEntry.description,
      Date:edituserEntry.date,
      Category:edituserEntry.category
    }
    let boolValinput = ValidateInput(edituserEntry)
    if(!boolValinput) {
      return res.render('new-entry',{formData:objData, warning:result})
    }
    const { spentOrsaved, currAmt } = await CheckAmount(edituserEntry.amount,req.params.id)
    
    const isNegative = ValidateSign(spentOrsaved)
    // if negative, it means that spent can be more than balance
    if(isNegative) {
      //check if the balance is less than spent
      let boolValamount = ValidateAmount(Math.abs(spentOrsaved))
      // if balance is less than spent, redirect to same page
      if(!boolValamount) {
        return res.render('new-entry',{formData:objData, warning:result})
      }
    }
    //console.log("new cost",edituserEntry.amount,"spent/saved",spentOrsaved,"prev cost",currAmt)
    const array = await ChangeAmount(spentOrsaved, amountObj.remainAmount, edituserEntry, req.params.id, amountObj._id)
    console.log(array)
    result = undefined
    res.redirect('/')
  })

  handler.get('/delete/:id',async function(req,res) {
    try {
      const deleteObj = await DeleteExpenseAndUpdateAmount(req.params.id, amountObj._id ,amountObj.remainAmount)
      if(!deleteObj) {
        return res.status(400).json({error:"Invalid Id"})
      }
      res.redirect('/')
    } catch (error) {
      return res.status(400).json({error:"Something went wrong"})
    }
    
  })

  handler.get('/cancel',function(req,res) {
    result = undefined
    app.locals.formData = {}
    res.redirect('/')
  })

  handler.get('/save',async function(req,res) {
    if(!amountObj) {
      return res.redirect('/')
    }
    await CreateStat(amountObj)
    res.redirect('/')
  })

  return handler
}
export { buildHandlerRoute, result }
