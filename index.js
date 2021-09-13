const express = require('express');
const app = express(); //se instancia objeto
const http = require('http'); //para peticiones http
const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});