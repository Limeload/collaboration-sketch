const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const redis = require('redis');
const redisSubscriber = redis.createClient();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (if needed)
app.use(express.static(__dirname + '/public'));

// Redis setup
const redisClient = redis.createClient();
io.adapter(require('socket.io-redis')({ host: 'localhost', port: 6379 }));

// Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle disconnect event
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  // Listen for events and broadcast to other clients
  socket.on('drawing', (data) => {
    // Broadcast the drawing data to other clients
    socket.broadcast.emit('drawing', data);
  });

  socket.on('text', (text) => {
    // Broadcast the text to other clients
    socket.broadcast.emit('text', text);
  });

  socket.on('image', (imageUrl) => {
    // Broadcast the image URL to other clients
    socket.broadcast.emit('image', imageUrl);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// Subscribe to Redis channels
redisSubscriber.subscribe('drawing', 'text', 'image');

// Listen for messages on subscribed channels
redisSubscriber.on('message', (channel, message) => {
  const data = JSON.parse(message);
  io.emit(channel, data); // Broadcast the message to all connected clients
});
