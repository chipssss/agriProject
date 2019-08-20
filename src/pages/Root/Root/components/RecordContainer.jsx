import React, {useState} from 'react';
import IceContainer from '@icedesign/container'
import styles from "./index.module.scss";
import {getImage} from "@/base/utils";
import {Grid, Pagination} from '@alifd/next'
import RecordList from "@/components/RecordList";
const Row = Grid.Row;
const Col = Grid.Col;

export default function RecordContainer(props) {
  const {recordList} = props;
  return (
    <IceContainer title={"记录"}>
      <RecordList recordList={recordList}/>
      <Pagination className={styles.pagination}/>
    </IceContainer>
  );
}
