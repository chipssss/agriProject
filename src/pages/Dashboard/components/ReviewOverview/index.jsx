import React, {useState, useEffect} from 'react';
import { Grid, Rating } from '@alifd/next';
import IceContainer from '@icedesign/container';
import Progress from './Progress';
import styles from './index.module.scss';
import stores from '@/stores'

const { Row, Col } = Grid;

export default function ReviewOverview(props) {
  const userStore = stores.useStore('user');
  const {enterprise, init} = userStore;

  useEffect(() => {
  }, [])


  return (
    <Row wrap gutter="20">
      <Col s="12" xxs="24">
        <IceContainer className={styles.container} title="我的组织">
          <div className={styles.overviewData}>
            {enterprise.name} <span className={styles.overviewDataUnit}>{enterprise.role}</span>
          </div>
          <div className={styles.overviewDataDetail}>
            <div>
              <div className={styles.overviewDataDetailCount}>茶类经营</div>
              <div className={styles.overviewDataDetailDesc}>
                所属行业
              </div>
            </div>
            <div>
              <div className={styles.overviewDataDetailCount}>茶</div>
              <div className={styles.overviewDataDetailDesc}>
                主要经营品种
              </div>
            </div>
            <div>
              <div className={styles.overviewDataDetailCount}>52</div>
              <div className={styles.overviewDataDetailDesc}>
                员工数量
              </div>
            </div>
          </div>
          <div className={styles.overviewDataExtraLinks}>
            <div className={styles.overviewDataExtraLinksTitle}>扩展链接</div>
            <div className={styles.overviewDataExtraLinksWrapper}>
              <a className={styles.overviewDataExtraLink} href="" target="_blank">
                企业介绍
              </a>
            </div>
          </div>
        </IceContainer>
      </Col>
      <Col s="12" xxs="24">
        <IceContainer className={styles.container} title="组织通知">
          <div className={styles.overviewRatingWrapper}>
            {/*<span className={styles.overviewRatingCount}>4.5</span>*/}
            {/*<span className={styles.overviewRating}>*/}
            {/*  <Rating value={4.5} disabled />*/}
            {/*</span>*/}
          </div>
          <div className={styles.overviewDetail}>
            <div className={styles.overviewDetailItem}>
              <span className={styles.overviewDetailItemText}>通知信息1</span>
              <span className={styles.overviewDetailItemPercentWrapper}>
                {/*<Progress*/}
                {/*  className={styles.overviewDetailItemPercent}*/}
                {/*  color="#447eff"*/}
                {/*  percent={90}*/}
                {/*  extra="480"*/}
                {/*/>*/}
                  内容
              </span>
            </div>
            <div className={styles.overviewDetailItem}>
              <span className={styles.overviewDetailItemText}>通知信息2</span>
              <span className={styles.overviewDetailItemPercentWrapper}>
                  内容
              </span>
            </div>
          </div>
        </IceContainer>
      </Col>
    </Row>
  );
}
