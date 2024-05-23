//var express = require("express");
import express from 'express'
import logger from 'morgan'
import path from 'path'

import conn from './db/conn.js'
import guestBookModel from './db/model.js'

conn.once('open',function() {
  console.log("connected to db")
})

conn.on('error',function() {
  console.log('failed to connect to Db')
})


var app = express();

//MUST BE SINGLE QUOTED
//set the path of the .ejs file
var absPath = path.resolve("./views");
app.set('views', absPath)
//set view engine
app.set('view engine', 'ejs')

//server css file
var absPathPublic = path.resolve("./public");
app.use(express.static(absPathPublic))

//a temp array to store the existing array from database
var entries = [];
//a Name to find and update the existing document
var Name = "gb"

async function AddToGuestBook(reqBody,date) {
  try {
    var initialData = await guestBookModel.findOne()

    //throws Null exception, nothing exists
    entries = initialData.arr

    entries.push({title:reqBody.title, content:reqBody.content, published:date})
    //console.log(entries)
    var result = await guestBookModel.updateOne({name:'gb'},{arr:entries})
    console.log(result)
  } catch (err) {
      console.error("The guestbook is empty.")
      entries.push({title:reqBody.title, content:reqBody.content, published:date})
      var newEntry = {name:Name,arr:entries}
      //console.log("new Entry is:",newEntry)
      try {
        var result = await guestBookModel.create(newEntry)
        console.log(result)
      } catch (err) {
        console.error(err.message) 
      }
    }
}


//logger m/w
app.use(logger("dev"))

//Populates a variable called req.body if the user is submitting a form. (The extended option is required.)
app.use(express.urlencoded({extended:false}))

app.get("/",async function(req,res) {
  try {
    var result = await guestBookModel.findOne()
    entries = result.arr
    res.status(200).render("index",{entries:entries})
  } catch (err) {
    //passes an empty array
    res.status(200).render("index",{entries:entries}) 
  }
})

app.get("/new-entry", function(req,res) {
  res.status(201).render("new-entry")
})

app.post("/new-entry", function(req,res) {
  const currentDate = new Date();
  /*
  const formattedDate = currentDate.toLocaleString('en-US',{ 
      weekday:'short',
      month:'short',
      day:'2-digit',
      year:'numeric',
      hour:'2-digit',
      minute:'2-digit', 
      hour12:true
    });
  */
  const title = req.body.title.trim()
  const content = req.body.content.trim()
  if(!title || !content) {
    return res.status(400).send("entries must have a title and content")
  }
  console.log(req.body)
  AddToGuestBook(req.body,currentDate)
  res.redirect("/")
})

app.use(function(req,res) {
  res.status(404).render("404")
})

app.listen(3000, ()=> {
  console.log("listening to port 3000")
})
