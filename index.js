const express = require('express');
const app = express(); //se instancia objeto
const http = require('http'); //para peticiones http
const server = http.createServer(app);
const { Server } = require('socket.io');//aca se solicita la libreria cocket.io que previamente inistaladas con npm install
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
      }
});//se crea un servicor interno para las peticiones 

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
    
  socket.on('socket update', (data) => {
      console.log(data);
      io.emit('socket update', data);
  });

  socket.on('login', () => {
      io.emit('login', 'conectado');
  });

});

server.listen(3000, () => {
  console.log('listening on *:3000');
});