import React, {useEffect} from 'react';
import Layout from '@icedesign/layout';
import Header from './components/Header';
import Aside from './components/Aside';
import Footer from './components/Footer';
import styles from './index.module.scss';
import stores from "@/stores";
import {COOKIE_KEY} from "@/base/constants";
import cookie from 'js-cookie'
import {Message} from '@alifd/next'

export default function BasicLayout(props) {
  const storeUser = stores.useStore('user');
  const {init, user, enterprise} = storeUser;

  useEffect(() => {
    // init cookie user data
    let userVal = cookie.getJSON(COOKIE_KEY.USER);
    // 检验登陆权限
    if (!userVal) {
      // 跳转登陆
      Message.warning('请先进行登陆');
      props.history.push('user/login');
      return;
    }
    init();
  }, []);

  return (
    <Layout
      fixable
      style={{ minHeight: '100vh' }}
      className={styles.iceLayout}
    >
      <Layout.Section>
        <Layout.Aside width={240}>
          <Aside />
        </Layout.Aside>

        <Layout.Main scrollable>
          <Layout.Header >
            <Header user={user} />
          </Layout.Header>
          <div className={styles.mainContainer}>
            {props.children}
          </div>
          <Footer />
        </Layout.Main>
      </Layout.Section>
    </Layout>
  );
}
