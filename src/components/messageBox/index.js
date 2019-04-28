import React from 'react';
import classnames from 'classnames';
import './style.less';

const moment = require('moment');


export default function MessageBox({ type = 'sent', headImgUrl, text, time, latest = false }) {
  return (
    <div
      className={classnames({
        message: true,
        latest,
        [`message-${type}`]: true,
      })}
    >
      <img src={headImgUrl} alt="" className="message-avatar" />
      <div className="message-text">
        {text}
        <div className="message-date">
          {moment(time).format('dddd h:mm a')}
        </div>
      </div>
    </div>
  );
}
