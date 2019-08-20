import React from 'react';
import { Grid, Progress, Icon } from '@alifd/next';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

const { Row, Col } = Grid;

export default function ReviewDetailInfo() {
  return (
    <Row wrap gutter="20">
      <Col s="8" xxs="24">
        <IceContainer className={styles.container} title="农资概要">
          <div className={styles.reviewRatingWrapper}>
            <div className={styles.reviewRating}>
              <span className={styles.reviewRatingIcon}>
                <span className={styles.reviewRatingScore}>630</span>
                <Icon
                  size="xxl"
                  className={styles.reviewRatingIconPositive}
                  type="smile"
                />
                <span className={styles.reviewRatingRatePositive}>67%</span>
              </span>
            </div>
            <div className={styles.reviewRatingDesc}>入库</div>
          </div>
          <div className={styles.reviewRatingDivideLine} />
          <div className={styles.reviewRatingWrapper}>
            <div className={styles.reviewRating}>
              <span className={styles.reviewRatingIcon}>
                <span className={styles.reviewRatingScore}>310</span>
                <Icon
                  size="xxl"
                  className={styles.reviewRatingIconNegative}
                  type="cry"
                />
                <span className={styles.reviewRatingRateNegative}>33%</span>
              </span>
            </div>
            <div className={styles.reviewRatingDesc}>出库</div>
          </div>
        </IceContainer>
      </Col>
      <Col s="8" xxs="24">
        <IceContainer className={styles.container} title="生产概要">
          <div className={styles.reviewTargetProgressWrapper}>
            <Progress
              className={styles.reviewTargetProgress}
              percent={50}
              shape="circle"
              textRender={() => <span>392 条</span>}
            />
          </div>
          <div className={styles.reviewRatingGoalDesc}>
            <p>已经完成一半目标，加油！</p>
          </div>
        </IceContainer>
      </Col>
      <Col s="8" xxs="24">
        <IceContainer className={styles.container} title="员工绩效">
          <div className={styles.reviewLeaderboard}>
            <div className={styles.reviewLeaderboardItem}>
              <span className={styles.reviewLeaderboardItemAvatar}>
                <img
                  className={styles.reviewLeaderboardItemAvatarImg}
                  width="40"
                  height="40"
                  src={require('./images/TB1j159r21TBuNjy0FjXXajyXXa-499-498.png_80x80.jpg')}
                  alt=""
                />
              </span>
              <span className={styles.reviewLeaderboardItemName}>李员工</span>
              <span className={styles.reviewLeaderboardItemCount}>912 条</span>
            </div>
            <div className={styles.reviewLeaderboardItem}>
              <span className={styles.reviewLeaderboardItemAvatar}>
                <img
                  className={styles.reviewLeaderboardItemAvatarImg}
                  width="40"
                  height="40"
                  src={require('./images/TB1Daimr1SSBuNjy0FlXXbBpVXa-499-498.png_80x80.jpg')}
                  alt=""
                />
              </span>
              <span className={styles.reviewLeaderboardItemName}>王员工</span>
              <span className={styles.reviewLeaderboardItemCount}>675 条</span>
            </div>
            <div className={styles.reviewLeaderboardItem}>
              <span className={styles.reviewLeaderboardItemAvatar}>
                <img
                  className={styles.reviewLeaderboardItemAvatarImg}
                  width="40"
                  height="40"
                  src={require('./images/TB1FGimr1SSBuNjy0FlXXbBpVXa-499-498.png_80x80.jpg')}
                  alt=""
                />
              </span>
              <span className={styles.reviewLeaderboardItemName}>赵员工</span>
              <span className={styles.reviewLeaderboardItemCount}>588 条</span>
            </div>
            <div className={styles.reviewLeaderboardItem}>
              <span className={styles.reviewLeaderboardItemAvatar}>
                <img
                  className={styles.reviewLeaderboardItemAvatarImg}
                  width="40"
                  height="40"
                  src={require('./images/TB1AdOerVOWBuNjy0FiXXXFxVXa-499-498.png_80x80.jpg')}
                  alt=""
                />
              </span>
              <span className={styles.reviewLeaderboardItemName}>马员工</span>
              <span className={styles.reviewLeaderboardItemCount}>462 条</span>
            </div>
            <div className={styles.reviewLeaderboardItem}>
              <span className={styles.reviewLeaderboardItemAvatar}>
                <img
                  className={styles.reviewLeaderboardItemAvatarImg}
                  width="40"
                  height="40"
                  src={require('./images/TB1FWimr1SSBuNjy0FlXXbBpVXa-499-498.png_80x80.jpg')}
                  alt=""
                />
              </span>
              <span className={styles.reviewLeaderboardItemName}>雷员工</span>
              <span className={styles.reviewLeaderboardItemCount}>376 条</span>
            </div>
          </div>
        </IceContainer>
      </Col>
    </Row>
  );
}
