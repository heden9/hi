import React from 'react';
import PropTypes from 'prop-types';

export default class ListView extends React.PureComponent {
  static defaultProps = {
    dataSource: [],
    row: () => {},
    className: '',
    onEndReached: () => {},
    renderFooter: () => {},
  };
  componentDidMount() {
    const { onEndReached } = this.props;
    const node = this.List.parentNode;
    node.addEventListener('scroll', () => {
      const sH = node.scrollHeight;
      const cH = node.clientHeight;
      const sT = node.scrollTop;
      if (sH - cH - sT <= 100) {
        onEndReached();
      }
    });
  }
  render() {
    const { dataSource, row, className, renderFooter, isLoading } = this.props;
    return (
      <div className={className} ref={(ref) => { this.List = ref; }}>
        {
          dataSource.map((item, index) => {
            return row(item, index);
          })
        }
        {
          renderFooter(isLoading)
        }
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
};
