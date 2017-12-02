import React from 'react';
import classnames from 'classnames';
import './style.less';

export default function MessageBox({ type = 'sent', headImgUrl = 'https://tva3.sinaimg.cn/crop.0.0.996.996.180/006aysN4jw8f924ehkvtgj30ro0rp766.jpg' }) {
  return (
    <div
      className={classnames({
        message: true,
        [`message-${type}`]: true,
      })}
    >
      <img src={headImgUrl} alt="" className="message-avatar" />
      <div className="message-text">
        How are you?How are you?How are you?How are you?How are you?
        <div className="message-date">
          Yesterday at 13:50
        </div>
      </div>
    </div>
  );
}
