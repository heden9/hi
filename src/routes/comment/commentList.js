import React from 'react';
import ListView from '../../components/listview';

const data = [
  {
    id: 1,
    headImgUrl: '头像url',
    nickname: '用户昵称',
    content: '评论内容',
    pubTime: '评论时间',
    pCNickname: '父级评论昵称',
    likeNum: 2,
    isLike: true,
  },
  {
    id: 2,
    headImgUrl: '头像url',
    nickname: '用户昵称',
    content: '评论内容',
    pubTime: '评论时间',
    pCNickname: '父级评论昵称',
    likeNum: 2,
    isLike: true,
  },
  {
    id: 3,
    headImgUrl: '头像url',
    nickname: '用户昵称',
    content: '评论内容',
    pubTime: '评论时间',
    pCNickname: '父级评论昵称',
    likeNum: 2,
    isLike: true,
  },
  {
    id: 4,
    headImgUrl: '头像url',
    nickname: '用户昵称',
    content: '评论内容',
    pubTime: '评论时间',
    pCNickname: '父级评论昵称',
    likeNum: 2,
    isLike: true,
  },
];
class CommentList extends React.PureComponent {
  state = {
    dataSource: data,
  };
  componentDidMount() {

  }
  render() {
    const { dataSource } = this.state;
    return (
      <ListView
        row={ListView.Item}
        dataSource={dataSource}
      />
    );
  }
}


export default CommentList;
