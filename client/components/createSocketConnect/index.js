import React from 'react';
import { connect } from 'dva';

class createSocketConnect extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch({ type: 'user/autoLogin', payload: { token: window.common.readStorage('token') } });
  }
  render() {
    return null;
  }
}

export default connect()(createSocketConnect);
