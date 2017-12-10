import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.less';

class Tabs extends React.PureComponent {
  static defaultProps = {
    itemWidth: window.innerWidth * 0.16,
    activeIndex: 0,
    onSelect: () => {},
  };
  componentDidMount() {
    this.setState({});  // eslint-disable-line
  }
  render() {
    const { children, itemWidth, activeIndex, onSelect } = this.props;
    return (
      <div>
        <ul className="tabs-container">
          {
            React.Children.map(children, (child, index) => {
              const newSelect = () => onSelect(index);
              return React.cloneElement(
                child,
                {
                  width: itemWidth,
                  active: activeIndex === index,
                  onSelect: newSelect,
                  node: this.content,
                },
              );
            })
          }
          <div
            className="tabs-line"
            style={{
              width: itemWidth,
              left: 20 + activeIndex * (itemWidth + 40),
            }}
          />
        </ul>
        <div className="tabs-content" ref={(ref) => { this.content = ref; }} />
      </div>
    );
  }
}

Tabs.Item = ({ title, children, active = false, width, onSelect, node }) => {
  return (
    <li
      style={{
        width,
        margin: '0 20px',
      }}
      onClick={onSelect}
      className={classnames({
        'tabs-item': true,
        active,
      })}
    >
      {title}
      {
        active && node && ReactDOM.createPortal(
          children,
          node,
        )
      }
    </li>
  );
};
Tabs.propTypes = {
  children: PropTypes.array,
  onSelect: PropTypes.func,
  activeIndex: PropTypes.number,
  itemWidth: PropTypes.number,
};

export default Tabs;
