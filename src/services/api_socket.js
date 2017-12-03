const io = require('socket.io-client');

const socket = io('http://192.168.1.102:3000');

export default {
  socket,
};
