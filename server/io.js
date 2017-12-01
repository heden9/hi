const request = require('request');
const { addSocketId, deleteSocketId } = require('./util');

const users = [];
global.io.on('connection', (socket) => {
  console.log('a user com');
  // socket.broadcast.emit('new_user', {});
  socket.on('disconnect', () => {
    console.log('user disconnected   ', socket.id);
    deleteSocketId(users, socket.id);
  });

  socket.on('user_login', (info) => {
    const { token } = info;
    // 进行用户登录验证
    request({
      url: 'http://app.nefuer.net/transToken',
      method: 'POST',
      json: true,
      headers: {
        'content-type': 'application/json',
        token,
      },
      body: JSON.stringify({ token }),
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const { data, code } = body;
        if (code !== 0) {
          socket.disconnect(); // 关闭连接
        } else if (code === 0) {
          addSocketId(users, { tokenId: token, userId: data.id, socketId: socket.id });
          console.log(users);
        }
      }
    });
  });
});

module.exports = users;
