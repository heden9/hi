import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';
import './style.less';
import './plus.less';

class AnimateNavios extends React.PureComponent {
  static defaultProps = {
    needNav: true,
  };
  state = {
    nowPos: 'page1',
    turnning: false,
    title2: '',
  };
  componentDidMount() {
    AnimateNavios.openFunc = this.open;
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  open = (settings) => {
    if (this.state.turnning) {
      return;
    }
    if (settings.title) {
      this.title2 = settings.title;
    }
    this.setState({
      turnning: true,
    });
    this.timer = setTimeout(() => {
      this.setState({
        nowPos: this.state.nowPos === 'page1' ? 'page2' : 'page1',
        turnning: false,
      });
    }, 400);
  }
  render() {
    const { nowPos, turnning } = this.state;
    const { mainView, subView, needNav, headerTitle } = this.props;
    return (
      <div className="pages-body">
        {
          needNav &&
          <Navigator
            {...this.state}
            title={headerTitle}
            open={this.open}
            title2={this.title2}
          />
        }
        <div className="pages-container">
          <div
            className={className({
              page: true,
              blank: true,
              'page-on-left': nowPos !== 'page1',
              'page-on-center': nowPos === 'page1',
              'page-from-center-to-left': nowPos === 'page1' && turnning,
              'page-from-left-to-center': nowPos !== 'page1' && turnning,
            })}
          >{mainView}</div>
          {
            (nowPos === 'page2' || turnning) &&
            <div
              className={className({
                'blank-2': true,
                page: true,
                'page-on-right': nowPos !== 'page2',
                'page-on-center': nowPos === 'page2',
                'page-from-center-to-right': nowPos === 'page2' && turnning,
                'page-from-right-to-center': nowPos !== 'page2' && turnning,
              })}
            >{ /* nowPos === 'page2' && */ subView}</div>
          }
        </div>
      </div>
    );
  }
}
AnimateNavios.propTypes = {
  mainView: PropTypes.element,
  subView: PropTypes.element,
  needNav: PropTypes.bool,
  headerTitle: PropTypes.string,
  // onChange: PropTypes.func,
};


function Navigator(props) {
  const { title = 'nav', title2 = 'nav2', nowPos, turnning, open } = props;
  return (
    <div
      className={className({
        'nav-container': true,
      })}
    >
      <div
        className={className({
          'nav-title': true,
          'navbar-on-left': nowPos === 'page2',
          'navbar-from-left-to-center': nowPos !== 'page1' && turnning,
          'navbar-from-center-to-left': nowPos === 'page1' && turnning,
        })}
      >
        <span className="nav-btn" />
        <span>{title}</span>
        <span className="nav-btn" />
      </div>
      {
        (nowPos === 'page2' || turnning) &&
        <div
          className={className({
            'nav-title': true,
            'navbar-on-right': nowPos === 'page1',
            'navbar-from-right-to-center': nowPos !== 'page2' && turnning,
            'navbar-from-center-to-right': nowPos === 'page2' && turnning,
          })}
        >
          <span className="nav-btn" onClick={open}>
            <i className="back-icon" />
            <span>返回</span>
          </span>
          <span>{title2}</span>
          <span className="nav-btn" />
        </div>
      }
    </div>
  );
}
export default AnimateNavios;
