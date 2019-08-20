import React, {useEffect, useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Balloon, Icon, Nav, Message} from '@alifd/next';
import FoundationSymbol from '@icedesign/foundation-symbol';
import IceImg from '@icedesign/img';
import {headerMenuConfig} from '@/config/menu.js';
import Logo from '../Logo';
import styles from './index.module.scss';
import stores from '@/stores'
import {getImage} from "@/base/utils";
import cookie from 'js-cookie'
import {COOKIE_KEY} from "@/base/constants";

/**
 * 初始化user store, 检验用户登陆跳转
 * @param props
 * @returns {*}
 * @constructor
 */

function Header(props) {
  const {user} = props;
  const {pathname} = location;
  return (
    <div className={styles.headerContainer}>
      <Logo isDark/>
      <div className={styles.headerNavbar}>
        <Nav
          className={styles.headerNavbarMenu}
          selectedKeys={[pathname]}
          defaultSelectedKeys={[pathname]}
          direction="hoz"
        >
          {headerMenuConfig
          && headerMenuConfig.length > 0
          && headerMenuConfig.map((nav, index) => {
            if (nav.children && nav.children.length > 0) {
              return (
                <Nav.SubNav
                  triggerType="click"
                  key={index}
                  title={(
                    <span>
                        {nav.icon ? (
                          <FoundationSymbol
                            style={{marginRight: '8px'}}
                            size="small"
                            type={nav.icon}
                          />
                        ) : null}
                      <span>{nav.name}</span>
                      </span>
                  )}
                >
                  {nav.children.map((item) => {
                    const linkProps = {};
                    if (item.external) {
                      if (item.newWindow) {
                        linkProps.target = '_blank';
                      }

                      linkProps.href = item.path;
                      return (
                        <Nav.Item key={item.path}>
                          <a {...linkProps}>
                            <span>{item.name}</span>
                          </a>
                        </Nav.Item>
                      );
                    }
                    linkProps.to = item.path;
                    return (
                      <Nav.Item key={item.path}>
                        <Link {...linkProps}>
                          <span>{item.name}</span>
                        </Link>
                      </Nav.Item>
                    );
                  })}
                </Nav.SubNav>
              );
            }
            const linkProps = {};
            if (nav.external) {
              if (nav.newWindow) {
                linkProps.target = '_blank';
              }
              linkProps.href = nav.path;
              return (
                <Nav.Item key={nav.path}>
                  <a {...linkProps}>
                      <span>
                        {nav.icon ? (
                          <FoundationSymbol
                            style={{marginRight: '8px'}}
                            size="small"
                            type={nav.icon}
                          />
                        ) : null}
                        {nav.name}
                      </span>
                  </a>
                </Nav.Item>
              );
            }
            linkProps.to = nav.path;
            return (
              <Nav.Item key={nav.path}>
                <Link {...linkProps}>
                    <span>
                      {nav.icon ? (
                        <FoundationSymbol
                          style={{marginRight: '8px'}}
                          size="small"
                          type={nav.icon}
                        />
                      ) : null}
                      {nav.name}
                    </span>
                </Link>
              </Nav.Item>
            );
          })}
        </Nav>
        <Balloon
          triggerType="hover"
          trigger={(
            <div
              className={styles.iceHeaderUserpannel}
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: 12,
              }}
            >
              <IceImg
                height={40}
                width={40}
                src={getImage(user.image)}
                className={styles.userAvatar}
              />
              <div className={styles.userProfile}>
                <span className={styles.userName} style={{fontSize: '13px'}}>
                  {user.username}
                </span>
                <br/>
                <span className={styles.userDepartment}>{user.showType}</span>
              </div>
              <Icon type="arrow-down" size="xxs" className={styles.iconDown}/>
            </div>
          )}
          closable={false}
          className={styles.userProfileMenu}
        >
          <ul>
            <li className={styles.userProfileMenuItem}>
              <Link to="/user/login">退出登录</Link>
            </li>
            <li className={styles.userProfileMenuItem}>
              <Link to="/setting/my">个人设置</Link>
            </li>
          </ul>
        </Balloon>
      </div>
    </div>
  );
}

export default withRouter(Header);
