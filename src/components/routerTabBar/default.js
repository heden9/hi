import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style2.less';
import Icon from '../../components/icon';

export default class RouterTabBar extends React.PureComponent {
  static defaultProps = {
  };
  constructor(...arg) {
    super(...arg);
    this.node = document.createElement('div');
    document.body.appendChild(this.node);
  }
  componentWillUnmount() {
    document.body.removeChild(this.node);
  }
  render() {
    const { children, barTintColor, unselectedTintColor } = this.props;
    return [
      <div
        key={2}
        className="router-tab-bar"
        style={{
          backgroundColor: barTintColor,
          color: unselectedTintColor,
        }}
      >
        {
          React.Children.map(children, child => child)
        }
      </div>,
    ];
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
