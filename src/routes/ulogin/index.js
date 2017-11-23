import React from 'react';
import { Button } from 'antd-mobile';
import { dialogOpen } from '../../components/dialog/test2';

const signInHandle = () => dialogOpen('signIn');
const signUpHandle = () => dialogOpen('signUp');
export default class uLogin extends React.Component {
  render() {
    return (
      <div>
        <Button onClick={signInHandle}>登录</Button>
        <Button onClick={signUpHandle}>注册</Button>
      </div>
    );
  }
}
