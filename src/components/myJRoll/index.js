import React from 'react';


const JRoll = require('jroll-lite');


export default class MyJRoll extends React.Component {
  constructor(props) {
    super(props);
    this.jroll = null;
  }
  componentDidMount() {
    const wrappers = this.props.ID || 'wrappers';
    const options = {
      scrollBarY: true,
      preventDefault: true,
    };
    this.jroll = new JRoll(`#${wrappers}`, options);
    this.jroll.on('scrollEnd', () => {
      if (this.jroll.y === this.jroll.maxScrollY) {
        this.props.onEndReached();
      }
    });
    this.jroll.refresh();
  }
  componentDidUpdate() {
    this.jroll.refresh();
  }
  componentWillUnmount() {
    this.jroll.destroy();
  }
  render() {
    const { height } = this.props;
    const { dataSource, row, isLoading, renderFooter } = this.props;
    return (
      <div id={this.props.ID ? this.props.ID : 'wrappers'} style={{ height: height || '100%' }}>
        <ul id="scroller">
          {
            dataSource.map((item, index) => {
              return row(item, index);
            })
          }
          {
            renderFooter(isLoading)
          }
        </ul>
      </div>
    );
  }
}
