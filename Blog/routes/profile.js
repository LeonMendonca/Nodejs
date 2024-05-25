import express from'express'
import multer from'multer'
import path from'path'
import fs from'fs'

import updateUser from'../utils/updateUser.js'

const profileRoute = express.Router()

function buildRoute(app) {
  profileRoute.get('/',function(req,res) {
    if(!app.locals.currentUser) {
      console.log("you need to be logged in")
      return res.status(302).redirect('/login')
    }
    return res.status(200).render('profile')
  })


  profileRoute.get('/edit',function(req,res) {
    return res.status(200).render('editProfile')
  })


  //multer for handling image
  const storage = multer.diskStorage({
    destination:function(req,file,cb) {
      const filePath = path.resolve(`./public/profileImages/${app.locals.currentUser.id}`)
      if(!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath)
      }
      cb(null,filePath)
    },
    filename:function(req,file,cb) {
      //delete the content of folder before creating/adding a new file

      const filePath = path.resolve(`./public/profileImages/${app.locals.currentUser.id}`)
      //returns the content of the dir in an array format, requires dir path
      const filenameArr = fs.readdirSync(filePath)
      console.log(filenameArr)
      //if folder contains a file, then delete
      if(filenameArr.length) {
        fs.unlinkSync(`${filePath}/${filenameArr[0]}`)
      }
      //removes the file in that dir, requires that specific filename
      cb(null,file.originalname)
    },
  })
  
  const upload = multer({ storage })

  profileRoute.post('/edit',upload.single('newProfileImage'),async function(req,res) {
    let filePath = '/profileImages/default.png'
    if(req.file) {
      filePath = `/profileImages/${app.locals.currentUser.id}/${req.file.originalname}`
    }

    const newUser = {
      id:app.locals.currentUser.id,
      filepath:filePath,
      name:req.body.newName,
      email:req.body.newEmail,
      role:app.locals.currentUser.role,
    }
  
    const newtoken = await updateUser(newUser)
    res.cookie('token',newtoken).redirect('/')
  })

  return profileRoute
}

export default buildRoute
