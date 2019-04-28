
const io = require('socket.io-client');

const socket = io(':3000');
export default {

  namespace: 'socket',

  state: {
    value: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
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
