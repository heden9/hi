import React from 'react';
// import { Button } from 'antd-mobile';
import './style.less';
import MessageBox from '../../components/messageBox';

export default class Chat extends React.PureComponent {
  render() {
    return (
      <div className="chat-container">
        {
          [1, 2, 3, 4, 5].map((item) => {
            // console.log(item/2);
            return (
              <MessageBox key={item} type={item % 2 ? 'sent' : 'received'} />
            );
          })
        }
      </div>
    );
  }
}
