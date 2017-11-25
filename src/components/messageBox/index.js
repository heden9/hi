import React from 'react';
import classnames from 'classnames';
import './style.less';

export default function MessageBox({ type = 'sent' }) {
  return (
    <div
      className={classnames({
        message: true,
        [`message-${type}`]: true,
      })}
    >
      <div className="message-text">
        How are you?
      </div>
    </div>
  );
}
