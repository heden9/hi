import { socket } from '../services/api_socket';

export default {

  namespace: 'chat',

  state: {
    messageQ: [],
    unreadMsgQ: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      socket.on('chat_received_msg', (data) => {
        console.log(data);
        dispatch({ type: 'save', payload: { data } });
      });
    },
  },

  effects: {
    /**
     * 发送聊天信息
     * @param payload
     * @param call
     * @param put
     * @param select
     */
    *sendChatMsg({ payload }, { call, put, select }) {  // eslint-disable-line
      const { sentId, receivedId, messages } = payload;
      socket.emit('chat_send_msg', { sentId, receivedId, messages });
    },
    /**
     * 保存记录到本地存档
     * @param payload
     * @param call
     * @param put
     * @param select
     */
    *loadLocalMsg({ payload }, { call, put, select }) {  // eslint-disable-line
      const { sentId, receivedId } = payload;
      const data = JSON.parse(window.common.readStorage(`${sentId}_${receivedId}`)) || [];
      yield put({ type: 'init', payload: { data } });
    },
    /**
     * 从本地存档读取聊天记录
     * @param payload
     * @param call
     * @param put
     * @param select
     */
    *saveMsgToLocal({ payload }, { call, put, select }) {  // eslint-disable-line
      const { sentId, receivedId } = payload;
      const { messageQ } = yield select(state => state.chat);
      window.common.writeStorage(`${sentId}_${receivedId}`, JSON.stringify(messageQ));
    },
  },

  reducers: {
    save(state, { payload: { data } }) {
      return { messageQ: state.messageQ.concat(data) };
    },
    init(state, { payload: { data } }) {
      return { messageQ: data };
    },
  },

};
