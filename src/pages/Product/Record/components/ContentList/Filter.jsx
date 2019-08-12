import React, {useState} from 'react';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

const data = {
  label: '农作物',
  value: [
    '全部',
    '菜心',
  ],
};

export default function Filter() {
  const [activeIndex] = useState(0);

  const handleClick = (value) => {
    console.log(value);
  };

  return (
    <IceContainer title="精确筛选">
      <div className={styles.filterContent}>
        <div
          className={styles.filterItem}
        >
          <div className={styles.filterLabel}>{data.label}:</div>
          <div className={styles.filterList}>
            {data.value.map((text, idx) => {
              const activeStyle =
                activeIndex === idx ? styles.active : null;
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
