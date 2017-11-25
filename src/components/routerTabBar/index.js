import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

export default class RouterTabBar extends React.PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div className="router-tab-bar">
        {
          React.Children.map(children, (child) => {
            return child;
          })
        }
      </div>
    );
  }
}

RouterTabBar.propTypes = {
  children: PropTypes.array,
};
