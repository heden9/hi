import React from 'react';
import { connect } from 'dva';
import { TextareaItem } from 'antd-mobile';
import ToolBar from '../../components/toolBar';
import './style.less';

class comment extends React.Component {
  componentDidMount() {
  }
  changeHandle = (value) => {
    this.props.dispatch({ type: 'comment/save', payload: { value } });
  };
  render() {
    return (
      <div>
        <TextareaItem
          value={this.props.value}
          onChange={this.changeHandle}
          placeholder="说点什么吧..."
          ref={(el) => { this.autoFocusInst = el; }}
          clear={false}
          rows={8}
        />
        <ToolBar />
      </div>
    );
  }
}


function SendBtn({ dispatch }) {
  return (
    <div onClick={dispatch.bind(null, { type: 'comment/sendComment' })}>发送</div>
  );
}


function mapStateToProps({ comment: { value } }) {
  return {
    value,
  };
}
export default {
  CommentBtn: connect()(SendBtn),
  Comment: connect(mapStateToProps)(comment),
};
