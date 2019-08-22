import React,{useState, useEffect} from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@alifd/next';
import styles from './index.module.scss';
import {apiGetStockSum} from "@/api/input/input";

const { Row, Col } = Grid;


/**
 * pattern sum: {
 *     "totalAmount": 157.08,
 *     "totalEntries": 2,
 *     "totalInputs": 15.4
 * }
 *
 * @returns {*}
 * @constructor
 */
export default function Overview() {
  const [sum, setSum] = useState({});

  useEffect(() => {
    apiGetStockSum().then(res => setSum(res));
  }, [])

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
        <Col l="4">
          <div className={styles.item}>
            <p className={styles.itemTitle}>总条目数（条）</p>
            <p className={styles.itemValue}>{sum.totalEntries}</p>
          </div>
        </Col>
        <Col l="4">
          <div className={styles.item}>
            <p className={styles.itemTitle}>总农资数（个）</p>
            <p className={styles.itemValue}>{sum.totalInputs}</p>
          </div>
        </Col>
        <Col l="4">
          <div className={styles.item}>
            <p className={styles.itemTitle}>总金额（元）</p>
            <p className={styles.itemValue}>{sum.totalAmount}</p>
          </div>
        </Col>
      </Row>
    </IceContainer>
  );
}
