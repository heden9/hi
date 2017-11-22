/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';
import { createPortal } from 'react-dom';
import { Headers } from '../../components/AnimateNavios';
import './style.less';

export default class Dialog extends React.Component {
  constructor(...arg) {
    super(...arg);
    this.node = window.document.createElement('div');
    document.body.appendChild(this.node);
  }
  static defaultProps = {
    title: 'xie',
    routes: {},
  };
  state = {
    title: '',
    turning: false,
  };
  componentDidMount() {
  }
  closeHandle = () => {
    this.setState({
      turning: true,
    });
    const node = this.dialog;
    node.addEventListener('webkitAnimationEnd', () => {
      window.document.body.removeChild(this.node);
    });
  };
  render() {
    const { title, rightBtn, WrapComponent } = this.props;
    return createPortal(
      <div
        ref={(ref) => { this.dialog = ref; }}
        className={className({
          'dialog-container': true,
          popUp: true,
          popDown: this.state.turning,
        })}
      >
        <Headers
          rightBtn={rightBtn}
          leftBtn={<span onClick={this.closeHandle}>关闭</span>}
          title={title}
        />
        <div className="dialog-body">
          <WrapComponent close={this.closeHandle} />
        </div>
      </div>,
      this.node,
    );
  }
}

Dialog.propTypes = {
  WrapComponent: PropTypes.func,
  title: PropTypes.string,
  rightBtn: PropTypes.element,
  routes: PropTypes.object,
};


function mixinDialog(WrapComponent) {
  return class extends React.Component {
    componentDidMount() {

    }
    render() {
      return (
        <WrapComponent {...this.props} />
      );
    }
  };
}
