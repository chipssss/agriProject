import React, {useState} from 'react';
import ContainerTitle from "@/components/ContainerTitle";
import IceContainer from '@icedesign/container'
import style from './index.module.scss'
import {Select} from '@alifd/next'

export default function Filter(props) {


  return (
    <IceContainer title={"精确筛选"}>
      <div>
        <div className={style.filterItem}>
          <div className={style.filterLabel}>批次</div>
          <Select className={style.filterDataItem}/>
        </div>
      </div>
    </IceContainer>
  );
}
