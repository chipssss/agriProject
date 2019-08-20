import React, {useState, useEffect} from 'react';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import {apiFieldGetList} from "@/api/product/field";
import {apiCropGetExistRecord} from "@/api/product/crop";

export default function Filter(props) {
  const [fieldList, setFieldList] = useState([]);
  const [cropList, setCropList] = useState([]);
  const [fieldActiveIndex, setFieldActiveIndex] = useState(0);
  const [cropActiveIndex, setCropActiveIndex] = useState(0);

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
    apiCropGetExistRecord().then(res => {
      res.unshift({
        name: "全部",
        id: 0
      });
      setCropList(res);
    })
  }, []);

  const handleFieldClick = (value,idx) => {
    console.log(value);
    setFieldActiveIndex(idx);
    screenVal.fieldId = value.id;
    props.onScreenChange(screenVal);
  };

  const handleCropClick = (value, idx) => {
    setCropActiveIndex(idx);
    screenVal.cropId = value.id;
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
                  onClick={() => handleFieldClick(fieldItem, idx)}
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
            {cropList.map((item, idx) => {
              const activeStyle =
                cropActiveIndex === idx ? styles.active : null;
              return (
                <span
                  onClick={() => handleCropClick(item)}
                  className={`${styles.filterText} ${activeStyle}`}
                  key={idx}
                >
                      {item.name}
                    </span>
              );
            })}
          </div>
        </div>
      </div>
    </IceContainer>
  );
}
