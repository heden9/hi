import React from 'react';
import { connect } from 'dva';
import { TextareaItem } from 'antd-mobile';
import Icon from '../../components/icon';
import './style.less';

class write extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.autoFocusInst.focus();
    }, 400);
  }
  changeHandle = (value) => {
    this.props.dispatch({ type: 'write/save', payload: { value } });
  };
  render() {
    return (
      <div>
        <TextareaItem
          value={this.props.value}
          onChange={this.changeHandle}
          placeholder="分享新鲜事..."
          ref={(el) => { this.autoFocusInst = el; }}
          clear={false}
          rows={8}
        />
        <div className="tool-bar">
          <Icon type={require('../../assets/icon/camera.svg')} />
          <Icon type={require('../../assets/icon/emoji.svg')} />
          <Icon type={require('../../assets/icon/location.svg')} />
          <Icon type={require('../../assets/icon/pic.svg')} />
          <Icon type={require('../../assets/icon/round_add.svg')} />
        </div>
      </div>
    );
  }
}


function SendBtn({ dispatch }) {
  return (
    <div onClick={dispatch.bind(null, { type: 'write/postDynamics' })}>发送</div>
  );
}


function mapStateToProps({ write: { value } }) {
  return {
    value,
  };
}
export default {
  Btn: connect()(SendBtn),
  Write: connect(mapStateToProps)(write),
};
