import React, {useState, useEffect} from 'react';
import ContainerTitle from "@/components/ContainerTitle";
import IceContainer from '@icedesign/container'
import style from './index.module.scss'
import {Select, Button, Pagination ,Message} from '@alifd/next'
import RecordList from '@/components/RecordList'
import {apiGetAllBatch} from "@/api/batch/batch";
import {getBatchesGenerated ,traceGenerate ,getRecordsUngenratedByBatch} from '@/api/host'
import {apiRootGetUnGeneratedBatchList} from "@/api/root/root";
import {apiRecordGetList} from "@/api/product/record";

const SelectItem = Select.Option;


export default function Filter(props) {
  const [recordlist, setRecordList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const {getRootList, modifyId, BatchId, group} = props;
  var List=[];
  const [BatchList, setBatchList] = useState([]);
  const showSuccess = () => Message.success('success');
  const showWarning = () => Message.warning('请选择记录');
  const screen = {};

  //生成溯源
  const createResult=()=>{
    var params={
      batchId:BatchId,
      recordIds:group
    };

    traceGenerate(params).then(res=>{
      console.log(res)
      showSuccess();
    }).catch(function (error) {
      showWarning();
      console.log(error);
    })
  }

  const requestData = (screenVal) => {
    apiRecordGetList(screenVal).then(res => {
      setRecordList(res.list);
      setTotalPages(res.pages)
    })
  };

  const handleScreenChange = (screenVal) => {
    // 重新拉取数据
    requestData(screenVal);
  };

  const handlePageChange = (page) => {
    screen.pageNum = page;
    requestData(screen);
  };

  const onCheck = (value) => {
    console.log('selectValue id: ' + value)
    modifyId(value)
  };

  const getResult=()=>{
    getRecordsUngenratedByBatch({
      batchId:BatchId,
      pageNum:1,
      pageSize:10
    }).then(res => {
      console.log('get res', res)
      setRecordList(res.list);
    })
  }
  useEffect(() => {

    // getRecordsUngenratedByBatch({
    //   batchId:21,
    //   pageNum:1,
    //   pageSize:10
    // }).then(res => {
    //   console.log('get res', res)
    //   //setRecordList(res.data.data.list);
    // });

    // 获取用户批次，并自动拉取第一个批次的待溯源信息
    getBatchesGenerated().then(res=>{
      console.log(res.data.data.unGenerated)
      var list=[]
      for(var i=0;i<res.data.data.unGenerated.length;i++){
        list.push(
          {
            label:res.data.data.unGenerated[i].name,
            value:res.data.data.unGenerated[i].id
          }
        )
      }
      setBatchList(list)
    })
  }, []);

  return (
    <div>
      <IceContainer title={"精确筛选"}>
        <div >
          <div className={style.filterItem}>
            <div className={style.filterLabel}>批次</div>
            <Select dataSource={BatchList} className={style.filterDataItem} onChange={onCheck}>
              {/*{batchList.map((value, index) => {*/}
              {/*  return (*/}
              {/*    <SelectItem value={value} onChange={setId(value.id)}>{value.id}</SelectItem>*/}
              {/*  )*/}
              {/*})}*/}
            </Select>
            <Button className={style.filterButton} onClick={createResult} type="primary">生成溯源</Button>
          </div>
        </div>
      </IceContainer>
      {/*<IceContainer>*/}
      {/*  /!*<RecordList recordList={recordlist} isRoot={true}/>*!/*/}
      {/*</IceContainer>*/}
    </div>
  );
}
