import React from 'react';
import { ActivityIndicator } from 'antd-mobile';
import { ScrollView } from '../../components/scrollView';
import Event from '../../components/dialog/event';

export function MixinGetfunc(getFunc, type = '评论') {
  return class CommentList extends React.PureComponent {
    constructor(...arg) {
      super(...arg);
      this.fetchData = this.fetchData.bind(this);
    }
    state = {
      dataSource: [],
      loading: true,
    };
    componentDidMount() {
      this.fetchData();
    }
    componentDidUpdate() {
      Event.fireEvent('detail_refresh');
    }
    async fetchData() {
      this.setState({
        loading: true,
      });
      const data = await getFunc(this.props.id);
      if (!data) {
        this.setState({
          loading: false,
        });
        return;
      }
      this.setState({
        dataSource: this.state.dataSource.concat(data),
        loading: false,
      });
    }
    render() {
      const { dataSource, loading } = this.state;
      return (
        <div>
          {
            loading && <div className="center"><ActivityIndicator text="加载中" /></div>
          }
          {
            dataSource.length === 0 ? <div className="empty">还没有人{type}过</div> :
              dataSource.map(item => (
                <ScrollView.Item {...item} key={item.id} />
              ))
          }
        </div>
      );
    }
  };
}

