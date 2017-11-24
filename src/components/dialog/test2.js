import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';
import { createPortal } from 'react-dom';
import { Headers } from '../../components/AnimateNavios';
import './style.less';
import Event from './event';

class Dialog extends React.Component {
  static defaultProps = {
    title: 'xie',
    superClose: () => {},
  };
  constructor(...arg) {
    super(...arg);
    this.node = window.document.createElement('div');
    this.node.className = 'ddd';
    document.body.appendChild(this.node);
  }
  state = {
    title: '',
    turning: false,
  };
  componentDidMount() {
    Event.addEvent('_dialog_close', this.closeHandle);
  }
  componentWillUnmount() {
    Event.removeEvent('_dialog_close');
  }
  closeHandle = () => {
    this.setState({
      turning: true,
    });
    const node = this.dialog;
    node.addEventListener('webkitAnimationEnd', () => {
      window.document.body.removeChild(this.node);
      this.props.superClose();
    });
  };
  render() {
    const { title, rightBtn, component: WrapComponent } = this.props;
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
          <WrapComponent closeHandle={this.closeHandle} />
        </div>
      </div>,
      this.node,
    );
  }
}

Dialog.propTypes = {
  component: PropTypes.func,
  title: PropTypes.string,
  rightBtn: PropTypes.element,
  superClose: PropTypes.func,
};

class MixinDialog extends React.Component {
  static defaultProps = {
    routes: [],
  };
  state = {
    stack: [],
  };
  componentDidMount() {
    Event.addEvent('_dialog_open', this.open);
  }
  componentWillUnmount() {
    Event.removeEvent('_dialog_open');
  }
  open = (url) => {
    this.setState({
      stack: this.state.stack.concat(url),
    });
  };
  close = (url) => {
    this.setState({
      stack: this.state.stack.filter(item => item === url),
    });
  };
  render() {
    return this.state.stack.map((item) => {
      const ele = this.props.routes[item];
      if (ele) {
        return (
          <Dialog
            {...ele}
            superClose={url => this.close(url)}
            key={item}
          />
        );
      } else {
        return null;
      }
    });
  }
}

export default {
  MixinDialog,
  dialogOpen(...arg) {
    Event.fireEvent('_dialog_open', ...arg);
  },
  dialogClose(...arg) {
    Event.fireEvent('_dialog_close', ...arg);
  },
};
