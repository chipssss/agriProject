import React, {useState, useEffect} from 'react';
import IceContainer from '@icedesign/container';
import {Grid, Pagination} from '@alifd/next';
import styles from './index.module.scss';
import Img from '@icedesign/img'
import {getImage} from "@/base/utils";

const {Row, Col} = Grid;

/**
 * 数据获取： props.recordList
 * 返回记录格式
 * data : [
 {
            "id": 4,
            "batchName": "第一批",
            "fieldName": "蒙牛牧场",
            "location": "香港",
            "cropId": 1,
            "operation": "除草,杀虫",
            "inputRecord": "test",
            "createTime": "2019-07-30 17:19:50",
            "remark": "diao",
            "weather": "晴朗",
            "images": [
                "2.jpg"
            ]
        }
 ]
 * @returns {*}
 * @constructor
 */
export default function Lists(props) {
  const [current, setCurrent] = useState(1);
  const {recordList, pages, onPageChange} = props;


  const handlePaginationChange = (current) => {
    setCurrent(current);
    onPageChange(current);
  };

  return (
    <IceContainer>
      <h4 className={styles.cardTitle}>记录列表</h4>
      <div className={styles.contentList}>
        {recordList.map((item, index) => {
          return (
            <div className={styles.item} key={index}>
              <h4 className={styles.title}>{item.fieldName}
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span>农作物: </span>
                <span>{item.cropName}</span>
              </h4>
              <Row>
                <Col l="8">
                  <div className={styles.operWrap}>
                    <div className={styles.oper}>
                      <span className={styles.operText}>{item.createTime}&nbsp;&nbsp;{item.weather}</span>
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
                    <span>投入品记录: </span>
                    <span>{item.inputRecord}</span>
                  </div>
                </div>
              </Row>

              <Row wrap>
                {
                  // 条件渲染， 避免images为null时报错
                  item.images? (item.images.map((item, index) => {
                    return (
                        <Col l="4">
                          <Img type="contain" width={200} height={200} src={getImage(item)} > </Img>
                        </Col>
                      );
                  })) : null
                }
              </Row>
            </div>
          );
        })}
      </div>
      <Pagination
        total={pages}
        className={styles.pagination}
        current={current}
        onChange={handlePaginationChange}
      />
    </IceContainer>
  );
}


