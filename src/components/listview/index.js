import React from 'react';
import _ from 'lodash';
import { List } from 'antd-mobile';
import PropTypes from 'prop-types';

export default class ListView extends React.PureComponent {
  static defaultProps = {
    dataSource: [],
    row: () => {},
    className: '',
    listenNode: window,
    onEndReached: null,
    renderFooter: () => {},
    scrollEventThrottle: 50,
  };
  componentDidMount() {
    const { onEndReached, listenNode, scrollEventThrottle } = this.props;
    let calNode = listenNode;
    if (listenNode === window) {
      calNode = document.documentElement;
    }
    if (onEndReached) {
      this.newScroll = _.throttle(() => {
        const sH = calNode.scrollHeight;
        const cH = calNode.clientHeight;
        const sT = calNode.scrollTop || document.body.scrollTop;
        if (sH - cH - sT <= 200) {
          onEndReached();
          console.log('end');
        }
      }, scrollEventThrottle);
      listenNode.addEventListener('scroll', this.newScroll);
    }
  }
  componentWillUnmount() {
    if (this.newScroll) {
      this.props.listenNode.removeEventListener('scroll', this.newScroll);
    }
  }
  render() {
    const { dataSource, row, className, renderFooter, isLoading } = this.props;
    return (
      <div className={className}>
        {
          dataSource.map((item, index) => {
            return row(item, index);
          })
        }
        {renderFooter(isLoading)}
      </div>
    );
  }
}

ListView.propTypes = {
  dataSource: PropTypes.array,
  row: PropTypes.func,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  onEndReached: PropTypes.func,
  renderFooter: PropTypes.func,
  scrollEventThrottle: PropTypes.number,
};

ListView.Item = ({ id, headImgUrl, nickname, pubTime, children }) => {
  return (
    <div key={id} className="home-row">
      <List.Item
        align="top"
        thumb={headImgUrl}
      >
        {nickname}
        <div className="time">{pubTime}</div>
      </List.Item>
      <pre className={'row-brief'}>
        {children}
      </pre>
    </div>
  );
};
