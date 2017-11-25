import { Toast } from 'antd-mobile';
import { signIn, signUp } from '../services/api_user';
import { dialogClose } from '../components/dialog/test2';

export default {

  namespace: 'user',

  state: {
    id: '',
    nickname: '',
    headImgUrl: '',
    token: window.common.readStorage('token'),
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *signIn({ payload }, { call, put }) {  // eslint-disable-line
      const data = yield call(signIn, payload);
      if (!data) {
        return;
      }
      Toast.success('登录成功：）', undefined, undefined, false);
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
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
