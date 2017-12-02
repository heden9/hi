const { addSocketId, deleteSocketId } = require('./util');

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
});
module.exports = users;
