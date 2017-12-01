
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
    *sendComment({ payload }, { call, put, select }) {  // eslint-disable-line
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
