import React from 'react';
import Event from '../dialog/event';

const JRoll = require('iscroll');

const u = window.navigator.userAgent;
function iScrollClick() {
  if (/iPhone|iPad|iPod|Macintosh/i.test(u)) return false;
  if (/Chrome/i.test(u)) return (/Android/i.test(u));
  if (/Silk/i.test(u)) return false;
  if (/Android/i.test(u)) {
    const s = u.substr(u.indexOf('Android') + 8, 3);
    return !(parseFloat(s[0] + s[3]) < 44);
  }
}
export default class MyJRoll extends React.Component {
  constructor(props) {
    super(props);
    this.jroll = null;
  }
  componentDidMount() {
    const wrappers = this.props.ID || 'wrappers';
    const options = {
      mouseWheel: true,
      scrollbars: true,
      click: iScrollClick(),
      fadeScrollbars: true,
      preventDefault: true,
      deceleration: 0.002,
      // bounce: false,
    };
    this.jroll = new JRoll(`#${wrappers}`, options);
    this.jroll.on('scrollEnd', () => {
      if (this.jroll.y <= this.jroll.maxScrollY + 200) {
        this.props.onEndReached();
      }
    });
    this.jroll.refresh();
    Event.addEvent(wrappers, this.jroll.scrollTo.bind(this.jroll));
  }
  componentDidUpdate() {
    this.jroll.refresh();
  }
  componentWillUnmount() {
    this.jroll.destroy();
    this.jroll = null;
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
