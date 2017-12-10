import React from 'react';

import Icon from '../icon';
import './style.less';

export default function ToolBar() {
  return (
    <div className="tool-bar">
      <Icon type={require('../../assets/icon/camera.svg')} />
      <Icon type={require('../../assets/icon/emoji.svg')} />
      <Icon type={require('../../assets/icon/location.svg')} />
      <Icon type={require('../../assets/icon/pic.svg')} />
      <Icon type={require('../../assets/icon/round_add.svg')} />
    </div>
  );
}
