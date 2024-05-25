import express from'express'
import multer from'multer'
import fs from'fs'
import path from'path'

const fileRoute = express.Router()

function buildFileUploadRoute(app) {
  const storage = multer.diskStorage({
    destination:function(req,file,cb) {
      let filePath;
      if(app.locals.currentUser) {
        filePath = path.resolve('./public/profileImages/'+app.locals.currentUser.id)
        if(!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath)
        }
      }
      //console.log('filepath:',filePath)
      cb(null,filePath)
    },
    filename:function(req,file,cb) {
      cb(null,file.originalname)
    }
  })

  const uploads = multer({ storage })

  fileRoute.post('/upload',uploads.single('profileImage'),function(req,res) {
    console.log("file uploaded")
    res.send('ok')
  })

  return fileRoute
}

export default buildFileUploadRoute
