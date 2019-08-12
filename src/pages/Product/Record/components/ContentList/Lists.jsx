import React, {useState} from 'react';
import IceContainer from '@icedesign/container';
import {Grid, Icon, Pagination} from '@alifd/next';
import styles from './index.module.scss';

const {Row, Col} = Grid;

const getData = () => {
  return Array.from({length: 10}).map((item, index) => {
    return {
      title: `${index + 1}. 田块A`,
      crop: 'crop',
      time: `2019-06-1${index}`,
      operation: '除草，杀虫',
      inputRecord: "氮肥 22kg",
    };
  });
};

export default function Lists() {
  const data = getData();
  const [current, setCurrent] = useState(1);

  const handlePaginationChange = (current) => {
    setCurrent(current);
  };

  return (
    <IceContainer>
      <h4 className={styles.cardTitle}>记录列表</h4>
      <div className={styles.contentList}>
        {data.map((item, index) => {
          return (
            <div className={styles.item} key={index}>
              <h6 className={styles.title}>{item.title}</h6>
              <Row>
                <Col l="16">
                  <div className={styles.metaWrap}>
                    <div className={styles.meta}>
                      <span>农作物: </span>
                      <span>{item.crop}</span>
                    </div>
                    <div className={styles.meta}>
                      <span>时间: </span>
                      <span>{item.time}</span>
                    </div>
                  </div>
                </Col>
                <Col l="8">
                  <div className={styles.operWrap}>
                    <div className={styles.oper}>
                      <Icon size="xs" type="ashbin" className={styles.operIcon}/>
                      <span className={styles.operText}>删除</span>
                    </div>
                    <div className={styles.oper}>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <div className={styles.metaWrap}>
                  <div className={styles.meta}>
                    <span>操作记录: </span>
                    <span>{item.operation}</span>
                  </div>
                </div>
              </Row>
              <Row>
                <div className={styles.metaWrap}>
                  <div className={styles.meta}>
                    <span>投入品使用记录: </span>
                    <span>{item.inputRecord}</span>
                  </div>
                </div>
              </Row>
            </div>
          );
        })}
      </div>
      <Pagination
        className={styles.pagination}
        current={current}
        onChange={handlePaginationChange}
      />
    </IceContainer>
  );
}


