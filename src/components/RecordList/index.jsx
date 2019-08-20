import React, {useState, useRef} from 'react';
import styles from "@/components/RecordList/index.module.scss";
import {getImage} from "@/base/utils";
import {Grid, Checkbox, Pagination} from '@alifd/next'
import Img from '@icedesign/img'
import IceContainer from '@icedesign/container'

const CheckBoxGroup = Checkbox.Group;
const Row = Grid.Row;
const Col = Grid.Col;

export default function index(props) {
  const {recordList, isRoot, pages, onPageChange} = props;
  const {current, setCurrent} = useState(1);

  const onGroupChange = (value) => {
    console.debug('onGroup change: ' + value)
  };

  const handlePaginationChange = (current) => {
    setCurrent(current);
    onPageChange(current);
  };

  return (
    <IceContainer title={"记录列表"}>
    <div>
      <CheckBoxGroup onChange={onGroupChange}>
        {recordList.map((item, index) => {
          return (
            <div className={styles.container}>
              {isRoot? (<Checkbox className={styles.checkbox} value={item.id} id={item.name}/>
                ): null}
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
                    item.images ? (item.images.map((item, index) => {
                      return (
                        <Col l="4">
                          <Img type="contain" width={200} height={200} src={getImage(item)}> </Img>
                        </Col>
                      );
                    })) : null
                  }
                </Row>
              </div>
            </div>
          );
        })}
      </CheckBoxGroup>
    </div>
      <Pagination
        total={pages}
        className={styles.pagination}
        current={current}
        onChange={handlePaginationChange}
      />
    </IceContainer>
)
}
