import cookie from 'js-cookie'
import React from 'react'
import {COOKIE_KEY} from "@/base/constants";
import {createBrowserHistory} from 'history';
import {Message} from  '@alifd/next';

const Auth = ({children}) => {
  let user = cookie.get(COOKIE_KEY.USER);
  // 如果没有user，返回登陆界面
  if (user) {
    return children;
  }
  // 提示登陆
  Message.warning('请先进行登陆')
  history.pushState({}, '', '/user/login')
  return children;
};

const withAuth = (params) => (WrapperedComponent) => {
  return (props) => {
    return (
      <Auth {...params}>
        <WrapperedComponent {...props} />
      </Auth>
    );
  };
};

export { withAuth };

export default Auth;
