const io = require('socket.io-client');

const socket = io('http://localhost:3000');
export default {

  namespace: 'socket',

  state: {
    value: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      socket.on('connect', () => {
        console.log('connect');
        // Toast.fail('连接成功~', 2);
      });
      socket.on('disconnect', () => {
        console.log('dis');
      });
      socket.on('receive_message', (data) => {
        console.log(data);
      });
      socket.on('login_feedback', (data) => {
        console.log(data);
      });
    },
  },

  effects: {
    *check_login({ payload }, { call, put, select }) {  // eslint-disable-line
      socket.emit('check_login', {
        token: window.common.readStorage('token'),
      });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
