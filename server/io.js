const { addSocketId, deleteSocketId, getSocketIdByUserId } = require('./util');

const users = [];
global.io.on('connection', (socket) => {
  console.log('a user com');
  // socket.broadcast.emit('new_user', {});
  socket.on('disconnect', () => {
    console.log('user disconnected   ', socket.id);
    deleteSocketId(users, socket.id);
  });

  socket.on('enter', (info) => {
    const { token, id } = info;
    addSocketId(users, { tokenId: token, userId: id, socketId: socket.id });
    console.log(users);
  });

  socket.on('chat_send_msg', (info) => {
    const { sentId, receivedId, messages } = info;
    const socketIdSent = getSocketIdByUserId(users, sentId);
    const socketIdRece = getSocketIdByUserId(users, receivedId);
    const time = new Date().getTime();
    global.io.sockets.to(socketIdRece).emit('chat_received_msg', { type: 'received', messages, time, sentId });
    global.io.sockets.to(socketIdSent).emit('chat_received_msg', { type: 'sent', messages, time });
  });
});
module.exports = users;
