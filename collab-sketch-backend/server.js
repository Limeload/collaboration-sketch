const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socketIo = require('socket.io')(server);
const redis = require('redis');
const redisClient = redis.createClient();

redisClient.on('error', (error) => {
    console.error('Redis error:', error);
});

socketIo.on('connection', (socket) => {
    console.log('A user connected');

    // Broadcast messages to all connected clients
    socket.on('draw', (data) => {
        // Store data in Redis
        redisClient.set('drawData', JSON.stringify(data));

        // Broadcast data to all clients
        socket.broadcast.emit('draw', data);
    });

    // More event handling here
});

const port = 3000;

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
