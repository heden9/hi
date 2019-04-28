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
    return [
      <TextareaItem
        key={1}
        value={this.props.value}
        onChange={this.changeHandle}
        placeholder="说点什么吧..."
        ref={(el) => { this.autoFocusInst = el; }}
        clear={false}
        rows={8}
      />,
      <ToolBar key={2} />,
    ];
  }
}


function SendBtn({ dispatch, ...props }) {
  return (
    <div onClick={dispatch.bind(null, { type: 'comment/sendComment', payload: props })}>发送</div>
  );
}


function mapStateToProps({ comment: { value } }) {
  return {
    value,
  };
}

const Comment = connect(mapStateToProps)(comment);
Comment.rightBtn = connect()(SendBtn);

export default Comment;
