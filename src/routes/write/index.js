import React from 'react';
import { connect } from 'dva';
import { TextareaItem, ActivityIndicator, ImagePicker } from 'antd-mobile';
import ToolBar from '../../components/toolBar';
import './style.less';

class write extends React.Component {
  state = {
    files: [],
  };
  changeHandle = (value) => {
    this.props.dispatch({ type: 'write/save', payload: { value } });
  };
  uploadHandle = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });
  };
  render() {
    const { files } = this.state;
    return (
      <div className="write-container">
        <TextareaItem
          value={this.props.value}
          onChange={this.changeHandle}
          placeholder="分享新鲜事..."
          ref={(el) => { this.autoFocusInst = el; }}
          clear={false}
          count={0}
          autoHeight
        />
        <ImagePicker
          files={files}
          onChange={this.uploadHandle}
          selectable={files.length <= 9}
        />
        <ToolBar />
      </div>
    );
  }
}


function SendBtn({ dispatch, loading }) {
  if (loading) {
    return <ActivityIndicator />;
  } else {
    return (
      <div onClick={dispatch.bind(null, { type: 'write/postDynamics' })}>发送</div>
    );
  }
}

function mapStateToProps({ write: { value } }) {
  return {
    value,
  };
}
export default {
  WriteBtn: connect(({ loading }) => ({ loading: loading.models.write }))(SendBtn),
  Write: connect(mapStateToProps)(write),
};
