const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

const port = 4000;
server.listen(port, ()=> {
  console.log(`listening on port ${port}`);
});



app.use(express.static(__dirname +'/public'));


// socket run

io.sockets.on('connection', (socket)=> {
  console.log('Connected: %s sockets connected',socket.id);
  socket.on('chat',(data)=>{
    io.sockets.emit('chat', data);
    socket.username = data.handle;
  });
  socket.on('typing', (data) => {
    socket.broadcast.emit('typing',data);
  });
  socket.on('disconnect', () => {
    socket.broadcast.emit('disconnect-affiche',socket.username);
   console.log('user %s disconnected',socket.username);
 });
});
