import React from 'react';
import styles from './index.module.scss';

const LoginIntro = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>智慧农业系统</div>
        <p className={styles.description}>简单、灵活、易使用的农事生产管理平台</p>
      </div>
    </div>
  );
};


export default LoginIntro;
