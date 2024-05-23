import express from'express'
import multer from'multer'
import fs from'fs'
import path from'path'

import blogCreate from'../utils/blogCreate.js'
import addComment from'../utils/addComments.js'
import blogModel from'../db/blogModel.js'
import commentModel from'../db/comment.js'

var blogRoute = express.Router()

function buildBlogRoute(app) {
  blogRoute.get('/addblog',function(req,res) {
    if(!app.locals.currentUser) {
      console.log("you need to be logged in")
      return res.status(302).redirect('/login')
    }
    return res.status(200).render('addBlog')
  })
  //multer only executes when a file is uploaded
  const storage = multer.diskStorage({
    destination:function(req,file,cb) {
      let filePath = path.resolve(`./public/coverPage/${app.locals.currentUser.id}`);
      //console.log('in multer',file)
      if(!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath)
      }
      //console.log(filePath)
      cb(null,filePath)
    },
    filename:function(req,file,cb) {
      //console.log('in multer',file)
      cb(null,file.originalname)
    },
  })

  var upload = multer({ storage })
 
  blogRoute.post('/',upload.single('coverImage'),async function(req,res) {
    //default file path, if no file uploaded
    let filePath = '/coverPage/defaultCoverPage.jpg'
    //if file is uploaded then
    if(req.file) {
      filePath = `/coverPage/${app.locals.currentUser.id}/${req.file.originalname}`
    }
    //creating a blog obj
    const blogObj = { 
      filepath:filePath,
      title:req.body.title, 
      content:req.body.content,
      currentUserid:app.locals.currentUser.id,
      name:app.locals.currentUser.name
    }
    const blogObjcreate = await blogCreate(blogObj)
    //console.log(req.file) //file.originalname
    //req.body //title content
    return res.status(304).redirect('/')
  })


  blogRoute.get('/:id',async function(req,res) {
    const oneBlog = await blogModel.findById(req.params.id)
    const allComments = await commentModel.find({blogId:req.params.id}).populate("writtenBy")
    //console.log(allComments)
    //console.log(oneBlog)
    res.render('viewBlog',{blog:oneBlog, comments:allComments})
    //res.send('test')
  })

  //comment route
  blogRoute.post('/comment/:blogid',async function(req,res) {
    commentObj = {
      comment:req.body.comment,
      blogId:req.params.blogid,
      writtenBy:app.locals.currentUser.id
    }
    const dbComment = await addComment(commentObj)
    res.redirect(`/blog/${req.params.blogid}`)
  })

  return blogRoute
}

export default buildBlogRoute
