const io = require('socket.io-client');

const socket = io('0.0.0.0:3000');

export default {
  socket,
};
