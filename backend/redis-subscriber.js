const redisSubscriber = redis.createClient();

// Subscribe to Redis channels
redisSubscriber.subscribe('drawing', 'text', 'image');

// Listen for messages on subscribed channels
redisSubscriber.on('message', (channel, message) => {
  const data = JSON.parse(message);
  io.emit(channel, data); // Broadcast the message to all connected clients
});
