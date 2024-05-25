import express from 'express';
import { nanoid } from 'nanoid';

import urlModel from '../model/urlmodel.js';
import { Create, Update } from '../utils/urldb.js';


const route = express.Router()

route.get('/',async function(_,res) {
  const data = await urlModel.find()
  if(!data) {
    return res.status(200).render('main',{ urls:[] })
  }
  res.status(200).render('main',{ urls:data })
})

route.get('/edit/:shId',async function(req,res) {
  const singleObj = await urlModel.findOne({shortId:req.params.shId})
  res.render('editurl',{ editUrl:singleObj.orgUrl, redirect:singleObj.shortId })
})

route.get('/:sid',async function(req,res) {
  const singleObj = await urlModel.findOne({shortId:req.params.sid})
  if(!singleObj) {
    return res.status(400).json({error:"Invalid short id"})
  }
  res.redirect(singleObj.orgUrl)
})

route.get('/delete/:shId',async function(req,res) {
  await urlModel.deleteOne({shortId:req.params.shId})
  res.redirect('/')
})

route.post('/',async function(req,res) {
  try {
    new URL(req.body.url)
    const shortId = nanoid(10)
    const createdObj = await Create(shortId,req.body.url)
    res.redirect('/')
  } catch (error) {
    res.status(400).json({"error":error.message})
  }
})

route.post('/edit/:shId',async function(req,res) {
  try {
    new URL(req.body.editurl)
    await Update(req.params.shId,req.body.editurl)
    res.redirect('/')
  } catch (error) {
    res.status(400).json({"error":error.message})
  }
})

export default route
