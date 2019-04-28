import { Toast } from 'antd-mobile';
import { getDynamics } from '../services/api_dynamics';

export default {

  namespace: 'dynamic',

  state: {
    dataSource: [],
    offset: 0,
    hasMore: 1,
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetchDynamic({ payload: { refresh } = {} }, { call, put, select }) {  // eslint-disable-line
      const options = yield select(state => state.dynamic);
      const data = yield call(getDynamics, { offset: refresh ? 0 : options.offset });
      console.log(data);

      if (options.offset === 0) {
        Toast.success(`已拉取${data.dynamics.length}条动态：）`);
      }
      yield put({
        type: 'saveDynamic',
        payload: {
          ...data,
          refresh,
        },
      });
    },
  },

  reducers: {
    saveDynamic(state, { payload: { dynamics, offset, hasMore, refresh } }) {
      return {
        ...state,
        dataSource: refresh ? dynamics : state.dataSource.concat(dynamics),
        offset,
        hasMore,
      };
    },
  },

};
