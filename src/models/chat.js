import { socket } from '../services/api_socket';

export default {

  namespace: 'chat',

  state: {
    messageQ: [],
    unreadMsgQ: {},
    withId: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      socket.on('chat_received_msg', (data) => {
        console.log(data);
        dispatch({ type: 'receiveMsgFromServer', payload: { data } });
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
     * 从本地存档读取聊天记录，并清空未读队列
     * @param payload
     * @param call
     * @param put
     * @param select
     */
    *loadLocalMsg({ payload }, { call, put, select }) {  // eslint-disable-line
      const { sentId, receivedId } = payload;
      let data = JSON.parse(window.common.readStorage(`${sentId}_${receivedId}`)) || [];
      // 开始清空未读队列
      const { unreadMsgQ } = yield select(state => state.chat);
      if (unreadMsgQ[receivedId]) {
        data = data.concat(unreadMsgQ[receivedId]);
      }
      yield put({ type: 'init', payload: { data, withId: receivedId } });
    },
    /**
     * 保存记录到本地存档
     * @param payload
     * @param call
     * @param put
     * @param select
     */
    *saveMsgToLocal({ payload }, { call, put, select }) {  // eslint-disable-line
      const { sentId, receivedId } = payload;
      const { messageQ } = yield select(state => state.chat);
      window.common.writeStorage(`${sentId}_${receivedId}`, JSON.stringify(messageQ));
      yield put({ type: 'changeId', payload: { withId: '' } });
    },
    /**
     * 从服务端接受的信息
     * @param data
     * @param call
     * @param put
     * @param select
     */
    *receiveMsgFromServer({ payload: { data } }, { call, put, select }) {  // eslint-disable-line
      const { withId } = yield select(state => state.chat);
      const { sentId } = data;
      if (!sentId) {  // 如果没有sentId。说明是发送信息，送入消息队列
        yield put({ type: 'save', payload: { data } });
      } else if (sentId) { // 如果有sentId 进入判断是否等于withId
        if (sentId !== withId) {  // 如果不是当前active的用户，将新消息送入未读队列
          yield put({ type: 'saveUnreadMsg', payload: { data } });
        } else if (sentId === withId) { // 如果是当前active的用户，送入消息队列
          yield put({ type: 'save', payload: { data } });
        }
      }
    },
  },

  reducers: {
    save(state, { payload: { data } }) {
      return { ...state, messageQ: state.messageQ.concat(data) };
    },
    init(state, { payload: { data, withId } }) {
      return {
        ...state,
        messageQ: data,
        withId,
        unreadMsgQ: {
          ...state.unreadMsgQ,
          [withId]: [],
        },
      };
    },
    changeId(state, { payload: { withId } }) {
      return { ...state, withId };
    },
    saveUnreadMsg(state, { payload: { data } }) {
      const arr = state.unreadMsgQ[data.sentId] || [];
      return {
        ...state,
        unreadMsgQ: {
          ...state.unreadMsgQ,
          [data.sentId]: arr.concat(data),
        },
      };
    },
  },

};
