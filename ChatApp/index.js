import express from 'express'
import { createServer } from 'http'
import { resolve } from 'path'

import { Server } from 'socket.io'
import { ConnectRedis } from './conn.js'

const redis = await ConnectRedis();

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  connectionStateRecovery: {}
})

app.use(express.static(resolve('./public')))

app.get('/',function(req,res) {
  res.render('index')
})

io.on('connection',(socket) => {
  console.log("user connected",socket.id)
  socket.on('chat_message',(msg,clientOffset,cb) => {
    console.log('message from client',msg);
    //cb({ status:"ok from server" });
    cb();

    //io.emit('broadcast',msg,offset)

    (async () => {
      try {
        const length = await redis.call('json.arrappend','messages','.',JSON.stringify({id:0,message:msg}))
        redis.call('json.set','messages',`.[${length-1}].id`,length)
        let lastIdx = length-1

        const response = await io.timeout(5000).emitWithAck('broadcast',msg,lastIdx)
        console.log("client response",response);
      } catch (e) {
        const messages = await redis.call('json.get','messages','.')
        if(!messages) {
          redis.call('json.set','messages','.',JSON.stringify([{id:1,message:msg}]))
        }
        console.log(e.message)
      }
    })()
  })

  if(!socket.recovered) {
    (async() => {
      try {
        let array = await redis.call('json.get','messages','.')
        if(!array) {
          return
        }
        array = JSON.parse(array)
        array.forEach(function(arr) {
          (async() => {
            if(arr.id > socket.handshake.auth.serverOffset) {
              const response = await io.timeout(3000).emitWithAck('broadcast',arr.message,arr.id)
              console.log(response)
            }
          })()
        })
        //console.log()
      } catch(error) {
        console.log(error.message)
      }
    })()
  }

  socket.on('disconnect',()=> {
    console.log('disconnected',socket.id)
  })
})

/*

*/

httpServer.listen(3000,()=> {
  console.log("ChatApp listening to 3000")
})
