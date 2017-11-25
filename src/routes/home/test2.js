import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { List, Button, Toast, ActivityIndicator } from 'antd-mobile';
import ListView from '../../components/listview';
import Icon from '../../components/icon';
import './style.less';
import { getDynamics, dynamicLikes } from '../../services/api_dynamics';
import { NavOpen } from '../../components/AnimateNavios';
import { dialogOpen } from '../../components/dialog/test2';

const Item = List.Item;


export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.state = {
      dataSource: [],
      isLoading: true,
      offset: 0,
      hasMore: 1,
      refreshing: false,
    };
  }

  componentDidMount() {
    // you can scroll to the specified position
    // setTimeout(() => this.lv.scrollTo(0, 120), 800);

    // simulate initial Ajax
    this.fetchData();
  }


  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.dataSource !== this.props.dataSource) {
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
  //     });
  //   }
  // }

  onEndReached = () => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading || !this.state.hasMore) {
      return;
    }
    this.setState({ isLoading: true });
    this.fetchData(this.state.offset);
  };
  onRefresh = () => {
    this.setState({ refreshing: true });
    // simulate initial Ajax
    this.fetchData();
  };
  async fetchData(now = 0) {
    const data = await getDynamics({ offset: now });
    if (!data) {
      return;
    }
    const { dynamics, hasMore, offset } = data;
    if (now === 0) {
      this.rData = {};
      Toast.success(`已拉取${dynamics.length}条动态：）`, undefined, undefined, false);
    }
    this.setState({
      dataSource: this.state.dataSource.concat(dynamics),
      offset,
      hasMore: !!hasMore,
      isLoading: false,
      refreshing: false,
    });
  }
  renderFooter = isLoading => (
    <div
      className="home-footer"
    >{isLoading ? <ActivityIndicator text="正在加载" /> : '到底啦'}</div>
  );
  render() {
    const { dataSource, isLoading } = this.state;
    return (
      <ListView
        isLoading={isLoading}
        renderFooter={this.renderFooter}
        onEndReached={this.onEndReached}
        className="scroll"
        dataSource={dataSource}
        row={Row}
      />
    );
  }
}
const Row = (prop) => {
  const {
    headImgUrl,
    nickname,
    brief,
    pubTime,
    likeNum,
    commentNum,
    id,
    img,
    isLike,
    isWhole,
  } = prop;
  return (
    <div key={id} className={'home-row test2'} onClick={() => open(nickname)}>
      <Item
        align="top"
        thumb={headImgUrl}
      >
        {nickname}
        <div className="time">{pubTime}</div>
      </Item>
      <pre className={'row-brief'}>
        {brief}
        {!!isWhole || <span className="readMore">阅读全文</span>}
      </pre>
      {
        img.map(item => (<img src={item} alt="" />))
      }
      <div className={'btn-group'}>
        <Button
          onClick={openForward}
          size={'small'}
          icon={<Icon type={require('../../assets/icon/forward.svg')} />}
        >转发</Button>
        <Button
          onClick={openComment}
          size={'small'}
          icon={<Icon type={require('../../assets/icon/comment.svg')} />}
        >{ commentNum || '评论'}</Button>
        <WrapButton size={'small'} id={id} isLike={!!isLike} likeNum={likeNum} />
      </div>
    </div>
  );
};

function openComment(e) {
  e.stopPropagation();
  dialogOpen('comment');
}
function openForward(e) {
  e.stopPropagation();
  dialogOpen('forward');
}
function open(title) {
  NavOpen('detail', { title });
}


class WrapButton extends React.PureComponent {
  constructor(...arg) {
    super(...arg);
    this.clickHandle = this.clickHandle.bind(this);
  }
  state = {
    isLike: this.props.isLike,
    num: this.props.likeNum,
    loading: false,
  };
  async clickHandle(e) {
    e.stopPropagation();
    if (this.state.loading) {
      Toast.info('操作太快啦😣', 1);
      return;
    }
    this.setState({
      loading: true,
    });
    const data = await dynamicLikes(this.state.isLike ? 'DELETE' : 'POST', this.props.id);
    if (!data) {
      return;
    }
    const num = this.state.isLike ? this.state.num - 1 : this.state.num + 1;
    this.setState({
      isLike: !this.state.isLike,
      num,
      loading: false,
    });
  }
  render() {
    return (
      <Button
        size={'small'}
        onClick={this.clickHandle}
        className={classnames({
          isLike: this.state.isLike,
        })}
        icon={<Icon
          type={
            this.state.isLike ?
              require('../../assets/icon/appreciate_fill.svg') :
              require('../../assets/icon/appreciate.svg')}
        />}
      >
        {this.state.num || '点赞'}
      </Button>
    );
  }
}
WrapButton.propTypes = {
  id: PropTypes.number.isRequired,
  likeNum: PropTypes.number.isRequired,
  isLike: PropTypes.bool.isRequired,
};
