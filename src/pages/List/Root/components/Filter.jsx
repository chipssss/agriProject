import React, {useState, useEffect} from 'react';
import ContainerTitle from "@/components/ContainerTitle";
import IceContainer from '@icedesign/container'
import style from './index.module.scss'
import {Select,Button} from '@alifd/next'
import {apiGetAllBatch} from "@/api/batch/batch";
import {apiRootGetUnGeneratedBatchList} from "@/api/root/root";
const SelectItem = Select.Option;

export default function Filter(props) {
  const {getRootList} = props;
  const [batchList, setBatchList] = useState([]);

  useEffect(() => {
    // 获取用户批次，并自动拉取第一个批次的待溯源信息
    apiRootGetUnGeneratedBatchList().then(setBatchList)
  }, []);

  return (
    <IceContainer title={"精确筛选"}>
      <div>
        <div className={style.filterItem}>
          <div className={style.filterLabel}>批次</div>
          <Select className={style.filterDataItem}>
            {batchList.map((value, index) => {
              return (
                <SelectItem value={value}>{value.name}</SelectItem>
              )
            })}
          </Select>
          <Button className={style.filterButton} type="primary">生成溯源</Button>
        </div>
      </div>
    </IceContainer>
  );
}
