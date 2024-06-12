//(async () => {})()

//debugger;
let count = 0;

const socket = io({
  ackTimeout:3000,
  retries:3,
  auth:{
    serverOffset:0
  }
});

const form = document.getElementById('form');
const input = document.getElementById('input');

const togglebtn = document.getElementById('toggle-btn')

togglebtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (socket.connected) {
    togglebtn.innerText = 'Connect';
    socket.disconnect();
  } else {
    togglebtn.innerText = 'Disconnect';
    socket.connect();
  }
});

//send to server
form.addEventListener('submit',(event) => {
  event.preventDefault();
  if(input.value) {
    console.log(input.value,socket.id);
    clientOffset = `${socket.id}-${count++}`
    socket.emit('chat_message',input.value,clientOffset);
    input.value = ""

    //this waits for 5 seconds for server to receive the message and send an ack
    /*
    (async () => {
      try {
        const response = await socket.timeout(5000).emitWithAck('chat_message', input.value);
        console.log("server response",response);
      } catch(e) {
        console.log(e.message);
      }
      input.value = '';
    })();
    */
    //this function will keep trying, until server ack
    /*
    async function EmitToServer() {
      try {
        const response = await socket.timeout(3000).emitWithAck('chat_message', input.value);
        console.log("server response",response)
      } catch (error) {
        console.log("couldn't send to server, retrying...")
        EmitToServer()
      }
    }
    EmitToServer()
  */
  }
})
socket.on('disconnect',(e) => {
  console.log(e)
})

socket.on('connect',() => {
  console.log("connected",socket.id)
})

//receive from server
const messagelist = document.getElementById('messages')
socket.on('broadcast',(msg,serverOffset,cb) => {
  const item = document.createElement('li');
  item.textContent = msg;
  messagelist.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
  cb({status:'ok from client'});
  socket.auth.serverOffset = serverOffset;
  console.log("client check",serverOffset);
})
