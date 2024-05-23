import amountModel from '../db/models/today_curr.js'
import expenseModel from '../db/models/expense_entry.js'


async function CreateAmt(amtObj) {
  console.log(amtObj)
  try {
    const createdAmtObj = await amountModel.create(amtObj)
    return createdAmtObj
  } catch(error) {
    return error.message
  }
}

async function CreateExpense(expObj) {
  console.log(expObj) 
  try {
    const createdExpObj = await expenseModel.create(expObj)
    return createdExpObj
  } catch(error) {
    return error.message
  }
}

async function GetExpenseById(expId) {
  console.log(expId)
  try {
    const expense = await expenseModel.findById(expId)
    return expense
  } catch (error) {
    return error.message
  }
}

async function CheckAmount(changeAmt, objId) {
  console.log(changeAmt,objId)
  try {
    let currAmtObj = await expenseModel.findById(objId)
    if(!currAmtObj) {
      return null
    }
    //return the amount as in -ve if spent, +ve if saved
    return { spentOrsaved : currAmtObj.amount - changeAmt, currAmt : currAmtObj.amount }
  } catch (error) {
    return error.message
  }
}

async function ChangeAmount(spentOrsaved,remainAmount,changeAmt, expId, amountId) {
  try {
    const changeAmtint = parseInt(changeAmt)
    //console.log("value",spentOrsaved,remainAmount,changeAmtint, expId, amountId)
    //console.log("final remain amount",remainAmount+spentOrsaved)
    const finalRemainAmount = remainAmount+spentOrsaved
    const expenseObj = await expenseModel.findOneAndUpdate({_id:expId},{amount:changeAmtint})
    const amountObj = await amountModel.findOneAndUpdate({_id:amountId},{remainAmount:finalRemainAmount})
    return [ expenseObj, amountObj ]
  } catch (error) {
    return error.message
  }
}

async function DeleteExpenseAndUpdateAmount(expId, todayAmtId, remainAmount ) {
  try {
    const expenseObj = await expenseModel.findOne({_id:expId})
    if(!expenseObj) {
      return null
    }
    const deletedObj = await expenseModel.findOneAndDelete({_id:expId})
    await amountModel.findOneAndUpdate({_id:todayAmtId}, {remainAmount:remainAmount+expenseObj.amount})
    //console.log(expId, expenseObj, todayAmtId, remainAmount )
    return deletedObj
  } catch (error) {
    throw error
  }
}
export { CreateAmt, CreateExpense, GetExpenseById, CheckAmount, ChangeAmount, DeleteExpenseAndUpdateAmount }
