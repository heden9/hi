import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';
import './style.less';
import './plus.less';
import Event from '../dialog/event';

class AnimateNavios extends React.PureComponent {
  static defaultProps = {
    needNav: true,
    classname: '',
    routes: {},
    main: {},
  };
  constructor(...arg) {
    super(...arg);
    this.subViewData = {};
  }
  state = {
    nowPos: 'page1',
    turning: false,
    title2: '',
  };
  componentDidMount() {
    Event.addEvent('_nav_open', this.openHandle);
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
    Event.removeEvent('_nav_open');
  }

  /**
   * 切换
   */
  toggle = () => {
    if (this.state.turning) {
      return;
    }
    this.setState({
      turning: true,
    });
    this.timer = setTimeout(() => {
      this.setState({
        nowPos: this.state.nowPos === 'page1' ? 'page2' : 'page1',
        turning: false,
      });
    }, 400);
  };
  /**
   * 打开
   * @param settings
   */
  openHandle = (url, options = {}) => {
    this.subViewData = { ...this.props.routes[url] };
    if (options.title) {
      this.subViewData.title = options.title;
    }
    this.toggle();
  };
  renderSubView = (subViewData) => {
    if (subViewData) {
      return (
        subViewData.component
      );
    }
  };
  render() {
    const { nowPos, turning } = this.state;
    const { needNav, classname, children, location: { pathname }, main } = this.props;
    return (
      <div className="pages-body">
        {
          needNav &&
          <Navigator
            {...this.state}
            classname={classname}
            config={main[pathname.substr(1, 10)]}
            subViewData={this.subViewData}
            close={this.toggle}
          />
        }
        <div className="pages-container">
          <div
            className={className({
              page: true,
              // blank: true,
              'page-on-left': nowPos !== 'page1',
              'page-on-center': nowPos === 'page1',
              'page-from-center-to-left': nowPos === 'page1' && turning,
              'page-from-left-to-center': nowPos !== 'page1' && turning,
            })}
          >{children}</div>
          {
            (nowPos === 'page2' || turning) &&
            <div
              className={className({
                // 'blank-2': true,
                page: true,
                'page-on-right': nowPos === 'page1',
                'page-on-center': nowPos === 'page2',
                'page-from-center-to-right': nowPos === 'page2' && turning,
                'page-from-right-to-center': nowPos !== 'page2' && turning,
              })}
            >
              {this.renderSubView(this.subViewData)}
            </div>
          }
        </div>
      </div>
    );
  }
}
AnimateNavios.propTypes = {
  needNav: PropTypes.bool,
  classname: PropTypes.string,
  routes: PropTypes.object,
  main: PropTypes.object,
  children: PropTypes.element,
  // onChange: PropTypes.func,
};


function Navigator(props) {
  const { config = {}, nowPos, subViewData, turning, close, classname } = props;
  const { title: title2 } = subViewData;
  return (
    <div
      className={className({
        'nav-container': true,
        [classname]: true,
      })}
    >
      <Header
        {...config}
        classname={className({
          'nav-title': true,
          'navbar-on-left': nowPos !== 'page1',
          'navbar-from-left-to-center': nowPos !== 'page1' && turning,
          'navbar-from-center-to-left': nowPos === 'page1' && turning,
        })}
      />
      {
        (nowPos === 'page2' || turning) &&
          <Header
            classname={className({
              'nav-title': true,
              'navbar-on-right': nowPos === 'page1',
              'navbar-from-right-to-center': nowPos !== 'page2' && turning,
              'navbar-from-center-to-right': nowPos === 'page2' && turning,
            })}
            leftBtn={<div onClick={close}>
              <i className="back-icon" />
              <span>返回</span>
            </div>}
            title={title2}
          />
      }
    </div>
  );
}

function Header({ classname, title, leftBtn, rightBtn }) {
  return (
    <div
      className={classname || 'nav-title'}
    >
      <div className="nav-btn" >{leftBtn}</div>
      <span>{title}</span>
      <div className="nav-btn" >{rightBtn}</div>
    </div>
  );
}

export function Headers(props) {
  return (
    <div className="nav-container">
      <Header {...props} />
    </div>
  );
}
export default AnimateNavios;
export function NavOpen(...arg) {
  Event.fireEvent('_nav_open', ...arg);
}
