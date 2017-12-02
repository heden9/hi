import React from 'react';
import { TextareaItem } from 'antd-mobile';
import { ScrollView } from '../../components/scrollView';
import './style.less';
import MessageBox from '../../components/messageBox';
import Event from '../../components/dialog/event';

export default class Chat extends React.PureComponent {
  componentDidMount() {
    console.log(this.props);
    Event.fireEvent('chat_scrollToBottom');
  }
  onFocus = () => {
    Event.fireEvent('chat_refresh');
  };
  render() {
    return (
      <div style={{ height: '100%' }}>
        <ScrollView ID="chat">
          <div className="chat-container">
            {
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((item) => {
                const type = item % 2 ? 'sent' : 'received';
                return (
                  <MessageBox
                    headImgUrl={this.props[type].headImgUrl}
                    key={item}
                    type={type}
                  />
                );
              })
            }
          </div>
        </ScrollView>
        <TextInput onFocus={this.onFocus} />
      </div>
    );
  }
}

class TextInput extends React.PureComponent {
  componentDidMount() {
    this.fun = (e) => {
      e.preventDefault();
    };
    this.input.addEventListener('touchmove', this.fun);
  }
  componentWillUnmount() {
    this.input.removeEventListener('touchmove', this.fun);
  }
  render() {
    const { onFocus } = this.props;
    return (
      <div className="send-input" ref={(ref) => { this.input = ref; }}>
        <TextareaItem
          onFocus={onFocus}
          placeholder={'说点什么吧...'}
          autoHeight
        />
      </div>
    );
  }
}
