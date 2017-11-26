import React from 'react';

import Tabs from '../../components/tabs';
import CommentList from '../comment/commentList';

const Item = Tabs.Item;
class ListGroup extends React.PureComponent {
  state = {
    activeIndex: 0,
  };
  onSelect = (activeIndex) => {
    this.setState({
      activeIndex,
    });
  };
  render() {
    const { activeIndex } = this.state;
    return (
      <Tabs
        onSelect={this.onSelect}
        activeIndex={activeIndex}
      >
        <Item
          title={'评论'}
        >
          <CommentList />
        </Item>
        <Item
          title={'转发'}
        >1</Item>
        <Item
          title={'赞'}
        >1</Item>
      </Tabs>
    );
  }
}

export default ListGroup;
