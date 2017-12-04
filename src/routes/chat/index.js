import React from 'react';
import { connect } from 'dva';
import { TextareaItem, Button } from 'antd-mobile';
import { ScrollView } from '../../components/scrollView';
import './style.less';
import MessageBox from '../../components/messageBox';
import Event from '../../components/dialog/event';

class Chat extends React.PureComponent {
  componentDidMount() {
    console.log(this.props);
    this.props.initMsg();
  }
  componentDidUpdate() {
    console.log('update');
    // Event.fireEvent(`chat_${this.props.received.id}_refresh`);
    Event.fireEvent(`chat_${this.props.received.id}_scrollToBottom`);
  }
  componentWillUnmount() {
    this.props.saveMsg();
  }
  onFocus = () => {
    Event.fireEvent(`chat_${this.props.received.id}_refresh`);
  };
  render() {
    const { sendMsg, messageQ } = this.props;
    return (
      <div style={{ height: '100%', background: 'white' }}>
        <ScrollView ID={`chat_${this.props.received.id}`}>
          <div className="chat-container">
            {
              messageQ.map(({ type, messages, time }) => {
                return (
                  <MessageBox
                    text={messages}
                    time={time}
                    headImgUrl={this.props[type].headImgUrl}
                    key={type + time}
                    type={type}
                  />
                );
              })
            }
          </div>
        </ScrollView>
        <TextInput
          onSubmit={sendMsg}
          onFocus={this.onFocus}
        />
      </div>
    );
  }
}

function mapStateToProps({ chat: { messageQ } }) {
  return {
    messageQ,
  };
}
function mapDispatchToProps(dispatch, props) {
  const { sent, received } = props;
  return {
    sendMsg(messages) {
      dispatch({ type: 'chat/sendChatMsg', payload: { sentId: sent.id, receivedId: received.id, messages } });
    },
    initMsg() {
      dispatch({ type: 'chat/loadLocalMsg', payload: { sentId: sent.id, receivedId: received.id } });
    },
    saveMsg() {
      dispatch({ type: 'chat/saveMsgToLocal', payload: { sentId: sent.id, receivedId: received.id } });
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
class TextInput extends React.PureComponent {
  static defaultProps = {
    onSubmit: () => {},
  };
  state = {
    value: '',
  };
  componentDidMount() {
    this.fun = (e) => {
      e.preventDefault();
    };
    this.input.addEventListener('touchmove', this.fun);
  }
  componentWillUnmount() {
    this.input.removeEventListener('touchmove', this.fun);
  }
  changeHandle = (value) => {
    this.setState({
      value,
    });
  };
  submitHandle = () => {
    const text = this.state.value.trim();
    if (!text) {
      return;
    }
    this.props.onSubmit(text);
    this.changeHandle('');
  };
  render() {
    const { onFocus } = this.props;
    return (
      <div className="send-input" ref={(ref) => { this.input = ref; }}>
        <TextareaItem
          onFocus={onFocus}
          value={this.state.value}
          onChange={this.changeHandle}
          placeholder={'说点什么吧...'}
          autoHeight
        />
        <Button onClick={this.submitHandle}>发送</Button>
      </div>
    );
  }
}
