const http = require('http');
const app = require('./index');
const socket = require('socket.io')



const port = process.env.PORT || 3000;
const server  = http.createServer(app);
const io = socket(server);



io.on('connection',socket=>{
    console.log("userConnecetd",socket.id);
    socket.on('pendingRequest',msg=>{
console.log(msg)
    })
})
server.listen(port,()=>{
    console.log('server is online on port number'+port);
   
})

