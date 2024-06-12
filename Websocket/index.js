import http from 'http'
import express from 'express'
import { resolve } from 'path'

import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

//socket.io
io.on('connection',(socket)=> {
  //socket is the user that est a connection
  //console.log(`socket ${socket.id} connected`) 
  socket.on('socketmsg',(message) => {
    io.emit('emitclient',message)
    //console.log(message)
  })
})

app.use(express.static(resolve('./public')))

app.get('/',function(req,res) {
  res.render('index.html')
})

app.use(function(req,res) {
  res.status(404).send("not found")
})

server.listen(3000,()=> {
  console.log("websocket at port 3000")
})
