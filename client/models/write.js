import { Toast } from 'antd-mobile';
import { delay } from 'dva/saga';
import { postDynamics } from '../services/api_dynamics';
import { dialogClose } from '../components/dialog/test2';
import Event from '../components/dialog/event';

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
    *postDynamics({ payload }, { call, put, select, take }) {  // eslint-disable-line
      const data = yield select(({ write }) => (write.value));
      if (!data.trim()) {
        return;
      }
      const result = yield call(postDynamics, data);
      if (!result) {
        return;
      }
      Toast.success('发布成功！');
      dialogClose('write');
      yield delay(400);
      Event.fireEvent('_list_refresh');
      yield put({ type: 'save', payload: { value: '' } });
      // yield
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
