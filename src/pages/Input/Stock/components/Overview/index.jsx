import React from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@alifd/next';
import styles from './index.module.scss';

const { Row, Col } = Grid;

const mockData = [
  {
    title: '总条目数(条)',
    value: '187',
  },
  {
    title: '总农资数(个)',
    value: '62',
  },
  {
    title: '总金额(元)',
    value: '23',
  }
];

export default function Overview() {
  return (
    <IceContainer className={styles.container}>
      <Row>
        <Col l="8">
          <div className={styles.item}>
            <img
              src="https://gw.alipayobjects.com/zos/rmsportal/heTdoQXAHjxNGiLSUkYA.svg"
              alt=""
            />
          </div>
        </Col>
        {mockData.map((item, index) => {
          return (
            <Col l="4" key={index}>
              <div className={styles.item}>
                <p className={styles.itemTitle}>{item.title}</p>
                <p className={styles.itemValue}>{item.value}</p>
              </div>
            </Col>
          );
        })}
      </Row>
    </IceContainer>
  );
}
