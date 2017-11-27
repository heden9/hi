import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.less';
import Icon from '../../components/icon';

export default class RouterTabBar extends React.PureComponent {
  static defaultProps = {
  };
  constructor(...arg) {
    super(...arg);
    this.node = document.createElement('div');
    document.body.appendChild(this.node);
  }
  componentDidMount() {
    this.prevent = (e) => {
      e.preventDefault();
    };
    this.tabbar.addEventListener('touchmove', this.prevent);
  }
  componentWillUnmount() {
    document.body.removeChild(this.node);
    this.tabbar.removeEventListener('touchmove', this.prevent);
  }
  render() {
    const { children, barTintColor, unselectedTintColor, content, keepAliveCom } = this.props;
    const { selected, component: Ele } = keepAliveCom;
    return (
      <div className="tab-container">
        <div style={{ display: selected ? 'block' : 'none' }} key={1}>
          <Ele />
        </div>
        {
          selected || React.Children.map(content, (child) => {
            return child;
          })
        }
        <section
          key={2}
          ref={(ref) => { this.tabbar = ref; }}
          className="router-tab-bar"
          style={{
            backgroundColor: barTintColor,
            color: unselectedTintColor,
          }}
        >
          {
            React.Children.map(children, child => child)
          }
        </section>
      </div>
    );
  }
}

function Item({ title, onPress = () => {}, selected, icon, selectedIcon }) {
  return (
    <div
      className={classnames({
        'tab-item': true,
        active: selected,
      })} onClick={onPress}
    >
      <Icon type={selected ? selectedIcon : icon} />
      <div>{title}</div>
    </div>
  );
}
RouterTabBar.propTypes = {
  children: PropTypes.array,
  unselectedTintColor: PropTypes.string,
  barTintColor: PropTypes.string,
  content: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]),
  keepAliveCom: PropTypes.object,
};
RouterTabBar.Item = Item;
