import React, {useState, useEffect} from 'react';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import {apiFieldGetList} from "@/api/product/field";

const data = {
  label: '农作物',
  value: [
    '全部',
    '菜心',
  ],
};

export default function Filter(props) {
  const [fieldList, setFieldList] = useState([]);
  const [fieldActiveIndex, setFieldActiveIndex] = useState(0);

  const screenVal = {
    startTime: null,
    endTime: null,
    fieldId: 0,
    cropId: 0
  };
  useEffect(() => {
    apiFieldGetList().then(res => {
      // 插入全部的类别
      res.unshift({
        name: "全部",
        id: 0
      });
      setFieldList(res);
    });

  }, []);

  const handleClick = (value,idx) => {
    console.log(value);
    setFieldActiveIndex(idx);
    screenVal.fieldId = value.id;
    props.onScreenChange(screenVal);
  };

  return (
    <IceContainer title="精确筛选">
      <div className={styles.filterContent}>
        <div
          className={styles.filterItem}
        >
          <div className={styles.filterLabel}>田块:</div>
          <div className={styles.filterList}>
            {fieldList.map((fieldItem, idx) => {
              const activeStyle =
                fieldActiveIndex === idx ? styles.active : null;
              return (
                <span
                  onClick={() => handleClick(fieldItem, idx)}
                  className={`${styles.filterText} ${activeStyle}`}
                  key={idx}
                >
                      {fieldItem.name}
                    </span>
              );
            })}
          </div>
        </div>
        <div
          className={styles.filterItem}
        >
          <div className={styles.filterLabel}>农作物:</div>
          <div className={styles.filterList}>
            {data.value.map((text, idx) => {
              const activeStyle =
                fieldActiveIndex === idx ? styles.active : null;
              return (
                <span
                  onClick={() => handleClick(text)}
                  className={`${styles.filterText} ${activeStyle}`}
                  key={idx}
                >
                      {text}
                    </span>
              );
            })}
          </div>
        </div>
      </div>
    </IceContainer>
  );
}
