import React from 'react';
import { Toast } from 'antd-mobile';

const io = require('socket.io-client');

const socket = io('http://localhost:3000');

class createSocketConnect extends React.PureComponent {
  async componentDidMount() {
    this.socketConnect();
  }
  socketConnect = () => {
    socket.on('connect', () => {
      console.log('connect');
      Toast.fail('连接成功~', 2);
    });
    socket.emit('user_login', {
      token: window.common.readStorage('token'),
    });
    socket.on('disconnect', () => {
      console.log('dis');
      Toast.fail('请登录哦~', 2);
    });
    socket.on('receive_message', (data) => {
      console.log(data);
    });
  };
  render() {
    return null;
  }
}

export default createSocketConnect;
