import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

export default class ListView extends React.PureComponent {
  static defaultProps = {
    dataSource: [],
    row: () => {},
    className: '',
    onEndReached: () => {},
    renderFooter: () => {},
    scrollEventThrottle: 50,
  };
  componentDidMount() {
    const { onEndReached, listenNode, scrollEventThrottle } = this.props;
    this.newScroll = _.throttle(() => {
      const sH = document.documentElement.scrollHeight;
      const cH = document.documentElement.clientHeight;
      const sT = document.documentElement.scrollTop || document.body.scrollTop;
      if (sH - cH - sT <= 200) {
        onEndReached();
        console.log('end');
      }
    }, scrollEventThrottle);
    listenNode.addEventListener('scroll', this.newScroll);
  }
  componentWillUnmount() {
    this.props.listenNode.removeEventListener('scroll', this.newScroll);
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
