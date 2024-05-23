var mongoose = require('mongoose')

var guestBookModel = require('./model')
var db = require('./conn')

db.on('error',function() {
  console.log('failed to connect to Db')
})

db.once('open',function() {
  console.log('connected to Db')
})

var Name = "gb"

var NewArray = []
async function GuestBook() {
  try {
    var initialData = await guestBookModel.findOne()

    NewArray = initialData.arr
    console.log(NewArray)

    var reqBody = {title:"nTitle",content:"nContent"}
    NewArray.push(reqBody)
    var result = await guestBookModel.updateOne({name:'gb'},{arr:NewArray})
    console.log(result)
  } catch (err) {
    console.error("The guestbook is empty.")
    var test = {name:Name,arr:{title:"firstTitle",content:"firstContent"}}
    guestBookModel.create(test)
      .then( result => {
        console.log(result)
    })
  }
}

GuestBook()
//creating the array
/*
if( NewArray.length === 0 ){
  
} else {
    }
*/
