import React from 'react';
import classnames from 'classnames';
import './style.less';

export default function MessageBox({ type = 'sent', headImgUrl, text, time }) {
  return (
    <div
      className={classnames({
        message: true,
        [`message-${type}`]: true,
      })}
    >
      <img src={headImgUrl} alt="" className="message-avatar" />
      <div className="message-text">
        {text}
        <div className="message-date">
          {time}
        </div>
      </div>
    </div>
  );
}
