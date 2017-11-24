import { Toast } from 'antd-mobile';
import { postDynamics } from '../services/api_dynamics';
import { dialogClose } from '../components/dialog/test2';

export default {

  namespace: 'write',

  state: {
    value: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *postDynamics({ payload }, { call, put, select }) {  // eslint-disable-line
      const data = yield select(({ write }) => (write.value));
      if (!data.trim()) {
        return;
      }
      const result = yield call(postDynamics, { content: data });
      if (!result) {
        return;
      }
      Toast.success('发布成功！');
      setTimeout(() => {
        dialogClose('write');
        put({ type: 'save', payload: { value: '' } });
      }, 100);
      // yield
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
