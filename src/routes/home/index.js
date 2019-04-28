import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { List, Button, Toast, ActivityIndicator } from 'antd-mobile';
import Icon from '../../components/icon';
import './style.less';
import { dynamicLikes } from '../../services/api_dynamics';
import { NavOpen } from '../../components/AnimateNavios';
import { dialogOpen } from '../../components/dialog/test2';
import Event from '../../components/dialog/event';
import ListView from '../../components/scrollView';

const Item = List.Item;

function mapStateToProps({ dynamic, loading }) {
  return {
    dataSource: dynamic.dataSource,
    loading: loading.effects['dynamic/fetchDynamic'],
    refreshing: dynamic.refreshing,
    hasMore: !!dynamic.hasMore,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDynamic(refresh) {
      dispatch({ type: 'dynamic/fetchDynamic', payload: { refresh } });
    },
  };
}

class Home extends React.Component {
  componentDidMount() {
    this.props.fetchDynamic();
    Event.addEvent('_list_refresh', this.onRefresh);
  }

  onEndReached = () => {
    if (this.props.loading || !this.props.hasMore) {
      return;
    }
    this.props.fetchDynamic();
  };
  onRefresh = () => {
    if (this.props.refreshing || this.props.loading) {
      return;
    }
    Event.fireEvent('wrappers_scrollTo', 0, 0);
    this.props.fetchDynamic(true);
  };
  renderFooter = isLoading => (
    <div
      className="home-footer"
    >{isLoading ? <ActivityIndicator text="正在加载" /> : '我也是有底线的'}</div>
  );
  render() {
    const { dataSource, loading, refreshing } = this.props;
    return [
      refreshing ? <div className="center" key={1}><ActivityIndicator text="正在刷新" /></div> : null,
      <ListView
        key={2}
        isLoading={loading}
        onEndReached={this.onEndReached}
        renderFooter={this.renderFooter}
        dataSource={dataSource}
        row={Row}
      />,
    ];
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
    img = [],
    isLike = false,
    isWhole = true,
  } = prop;
  return (
    <div
      key={id}
      style={{ backgroundImage: 'url(\'https://img.t.sinajs.cn/t6/skin/public/feed_cover/star_108_os7.png\')' }}
      className={'home-row test2'}
      onClick={() => open({ title: nickname, id })}
    >
      <Item
        align="top"
        thumb={headImgUrl}
      >
        {nickname}
        <div className="time">{pubTime}</div>
      </Item>
      <pre className={'row-brief'}>
        {brief}
        {!!isWhole || <span className="readMore">全文</span>}
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
          onClick={e => openComment(e, prop)}
          size={'small'}
          icon={<Icon type={require('../../assets/icon/comment.svg')} />}
        >{ commentNum || '评论'}</Button>
        <WrapButton size={'small'} id={id} isLike={!!isLike} likeNum={likeNum} />
      </div>
    </div>
  );
};

Home.rightBtn = () => {
  return <Icon type={require('../../assets/icon/post.svg')} onClick={() => dialogOpen('write')} />;
};
Home.leftBtn = () => {
  return <Icon type={require('../../assets/icon/refresh.svg')} onClick={() => Event.fireEvent('_list_refresh')} />;
};

Home.Row = Row;

function openComment(e, prop) {
  e.stopPropagation();
  dialogOpen('comment', prop);
}
function openForward(e) {
  e.stopPropagation();
  dialogOpen('forward');
}
function open({ title, id }) {
  NavOpen('detail', { title, id });
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
  componentWillReceiveProps({ isLike, likeNum }) {
    this.setState({
      isLike,
      num: likeNum,
    });
  }
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
      this.setState({
        loading: false,
      });
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
