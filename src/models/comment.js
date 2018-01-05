import { Toast } from 'antd-mobile';
import { postComment } from '../services/api_dynamics';
import { dialogClose } from '../components/dialog/test2';

export default {

  namespace: 'comment',

  state: {
    value: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *sendComment({ payload }, { call, put, select }) {  // eslint-disable-line
      const data = yield select(({ write }) => (write.value));
      if (!data.trim()) {
        return;
      }
      const result = yield call(postComment, { content: data, ...payload });
      if (!result) {
        return;
      }
      Toast.success('发布成功！', undefined, undefined, undefined, false);
      setTimeout(() => {
        dialogClose('comment');
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
