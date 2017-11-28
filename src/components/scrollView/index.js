import React from 'react';
import { List } from 'antd-mobile';
import classnames from 'classnames';
import Event from '../dialog/event';
import Icon from '../../components/icon';

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
export class ScrollView extends React.Component {
  static defaultProps = {
    onEndReached: () => {},
  };
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
    setTimeout(() => {
      console.log('refresh');
      this.jroll.refresh();
    }, 0);
    Event.addEvent(`${wrappers}_scrollTo`, this.jroll.scrollTo.bind(this.jroll));
    Event.addEvent(`${wrappers}_refresh`, this.jroll.refresh.bind(this.jroll));
  }
  componentDidUpdate() {
    this.jroll.refresh();
  }
  componentWillUnmount() {
    this.jroll.destroy();
    this.jroll = null;
  }
  render() {
    const { height, children } = this.props;
    return (
      <div id={this.props.ID ? this.props.ID : 'wrappers'} style={{ height: height || '100%' }}>
        <ul id="scroller">
          { children }
        </ul>
      </div>
    );
  }
}

export default function ListView({ dataSource, row, renderFooter, isLoading, onEndReached }) {
  return (
    <ScrollView
      onEndReached={onEndReached}
    >
      {
        dataSource.map((item, index) => {
          return row(item, index);
        })
      }
      {
        renderFooter(isLoading)
      }
    </ScrollView>
  );
}
const Brief = List.Item.Brief;
ScrollView.Item = ({ id, headImgUrl, className = '', nickname, pubTime, content, likeNum }) => {
  return (
    <div
      key={id}
      className={classnames({
        'home-row': true,
        [className]: true,
      })}
    >
      <List.Item
        align="top"
        extra={!!likeNum && <Icon type={require('../../assets/icon/appreciate.svg')} />}
        thumb={headImgUrl}
      >
        {nickname}
        <div className="time">{pubTime}</div>
        {
          content && <Brief>{content}</Brief>
        }
      </List.Item>
    </div>
  );
};
