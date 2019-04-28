import { Toast } from 'antd-mobile';
import { signIn, signUp, checkLogin } from '../services/api_user';
import { dialogClose } from '../components/dialog/test2';

import { socket } from '../services/api_socket';

export default {

  namespace: 'user',

  state: {
    id: '',
    nickname: undefined,
    headImgUrl: undefined,
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      socket.on('connect', () => {
        console.log('chat connect');
        Toast.success('聊天室连接成功~', 2);
      });
      socket.on('disconnect', () => {
        console.log('chat disconnect');
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
    *signIn({ payload }, { call, put }) {  // eslint-disable-line
      const data = yield call(signIn, payload);
      if (!data) {
        return;
      }
      Toast.success('登录成功：）', undefined, undefined, false);
      socket.open();
      socket.emit('enter', { ...data, token: window.common.readCookie('token') });
      setTimeout(() => {
        dialogClose('signIn');
      }, 100);
      yield put({ type: 'save', payload: data });
    },
    *signUp({ payload }, { call, put }) {  // eslint-disable-line
      const data = yield call(signUp, payload);
      if (!data) {
        return;
      }
      Toast.success('注册成功：）');
      setTimeout(() => {
        dialogClose('signUp');
      }, 100);
      yield put({ type: 'save', payload: data });
    },
    *autoLogin({ payload }, { call, put, select }) {  // eslint-disable-line
      const data = yield call(checkLogin);
      if (!data) {
        socket.disconnect();
        return;
      }
      socket.emit('enter', { ...data, token: window.common.readCookie('token') });
      yield put({ type: 'save', payload: data });
    },
    *signOut({ payload }, { call, put, select }) {  // eslint-disable-line
      window.common.writeCookie('token', '');
      socket.disconnect();
      yield put({ type: 'save', payload: {} });
    },
  },

  reducers: {
    save(state, { payload: { id, headImgUrl, nickname } }) {
      return { ...state, id, headImgUrl, nickname };
    },
  },

};
