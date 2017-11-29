global.io.on('connection', (socket) => {
  // console.log('a user connected');
  // socket.broadcast.emit('new_user', {});

  socket.on('disconnect', () => {
    console.log('user disconnected   ', socket.id);
  });

  socket.on('user_login', (info) => {
  });
});
