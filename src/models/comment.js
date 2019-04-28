import { Toast } from 'antd-mobile';
import { postComment } from '../services/api_dynamics';
import { dialogClose } from '../components/dialog/test2';
import { delay } from '../utils/delay';

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
      const data = yield select(({ comment }) => (comment.value));
      if (!data.trim()) {
        return;
      }
      const result = yield call(postComment, { content: data, dynamicId: payload.id });
      if (!result) {
        return;
      }
      Toast.success('发布成功！', undefined, undefined, undefined, false);
      yield delay(100);
      dialogClose('comment');
      yield put({ type: 'save', payload: { value: '' } });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
