import React from 'react';
import {Grid} from '@alifd/next';
import {Img} from '@icedesign/img'
import Footer from './components/Footer';
import Intro from './components/Intro';
import styles from './index.module.scss';
import {GLOBAL} from "@/base/constants";

const {Row, Col} = Grid;

export default function UserLayout(props) {
  return (
    <div className={styles.container}>
      <div className={styles.img}/>
      <h2 className={styles.title}>{GLOBAL.title}</h2>
      <div className={styles.form}>
        {props.children}
      </div>
    </div>
  );
}
