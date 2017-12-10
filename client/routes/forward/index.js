import React from 'react';
import { connect } from 'dva';
import { TextareaItem } from 'antd-mobile';
import ToolBar from '../../components/toolBar';
import './style.less';

class forward extends React.Component {
  componentDidMount() {
  }
  changeHandle = () => {
  };
  render() {
    return (
      <div>
        <TextareaItem
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


function SendBtn() {
  return (
    <div>发送</div>
  );
}


function mapStateToProps() {
  return {
  };
}

const Forward = connect(mapStateToProps)(forward);
Forward.rightBtn = connect()(SendBtn);

export default Forward;
