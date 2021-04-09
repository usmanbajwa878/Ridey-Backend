const http = require("http");
const app = require("./index");
const socket = require("socket.io");
const webSocketServer = require("websocket").server;
const uuid  = require('uuid').v4;
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socket(server);
// const ws = new webSocketServer({
//   httpServer: server,
//   autoAcceptConnections: true,
// });

// ws.on('connect', function(connection) {
//     console.log('WebSocket Client Connected');
//     connection.on('error', function(error) {
//         console.log("Connection Error: " + error.toString());
//     });
//     connection.on('close', function() {
//         console.log('echo-protocol Connection Closed');
//     });
//     connection.on('message', function(message) {
//         console.log("message Incoming",message)
//         if (message.type === 'utf8') {
//             console.log("Received: '" + message.utf8Data + "'");
//         }
//     });
//     connection.on('pendingRequest', function(message) {
//         connection.emit('IncomingRequest',message)
//     });
//     connection.on('AcceptRequest', function(message) {
//         connection.emit('AcceptRequestUser',message)
//     });
    
//     function sendNumber() {
//         if (connection.connected) {
//             var number = Math.round(Math.random() * 0xFFFFFF);
//             // connection.sendUTF(number.toString());
//             setTimeout(sendNumber, 1000);
//         }
//     }
//     sendNumber();
// });

const mockData = {
  _id: "60642c1ba55c111757be0ee9",
  requestId: "60642c1ba55c111757be0ee8",
  userId: "604f9defd36a690679798f7f",
  distance: "377.227",
  status: "InProgress",
  source: "Lahore, Pakistan",
  destination: "Islamabad, Pakistan",
  date: "3-2-2021",
  user: {
    _id: "604f9defd36a690679798f80",
    userId: "604f9defd36a690679798f7f",
    name: "Ddadad",
    phoneNumber: "42424242",
    nicNumber: "4242424",
    profileImg:
      "http://res.cloudinary.com/dx8xcafmu/image/upload/v1615830508/files/files/Mon%20Mar%2015%202021%2022:48:26%20GMT%2B0500%20%28Pakistan%20Standard%20Time%29.jpg",
  },
  __v: 0,
};

 io.on("connection", (socket) => {
  console.log("userConnecetd", socket.id);
  socket.on("pendingRequest", (msg) => {
    //   const ids = io.sockets.engine.clients;
    //   console.log(ids);
    socket.broadcast.emit("IncomingRequest", msg);
  });
  //  socket.emit('IncomingRequest',mockData)
  socket.on("AcceptRequest", (acceptdata) => {
      
      const roomId = uuid();
      socket.join(roomId);
      console.log("roomId",roomId)
      const data = {...acceptdata,roomId};
      console.log("roomConnection data",data)
    socket.broadcast.emit("AcceptRequestUser", data);
    socket.emit('AcceptRequestUser',data)
    console.log("accept", data);
  });
  socket.on("roomConnection", (data) => {
    socket.join(data.roomId);
    // socket.broadcast.emit("AcceptRequestUser", data);
    // socket.emit('AcceptRequestUser',data)
    console.log("accept", data);
    socket.emit("roomConnected",data)
  
  }); 
  console.log(io.allSockets());

});
server.listen(port, () => {
  console.log("server is online on port number" + port);
});
