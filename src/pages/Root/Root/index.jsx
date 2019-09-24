import React, {useState, useEffect} from 'react';
import Filter from "@/pages/Root/Root/components/Filter";
import {apiRecordGetList} from "@/api/product/record";
import RecordList from '@/components/ReRecordList'
import {apiGetRootList} from "@/api/root/root";
import {getBatchesGenerated ,traceGenerate ,getRecordsUngenratedByBatch} from '@/api/host'

export default function index(props) {
  const [list, setList] = useState([]);
  const [BatchId,setBatchId]=useState(null);

  const [page,setPage]=useState(1);
  const [lastpage,setLastpage]=useState(1);
  const [checkGroup,setCheckgroup]=useState([]);//临时保存checkbox值
  const [checkValue, setCheckBoxValue] = useState([]);//修改checkbox值
  const modifyId=(id)=>{
    setBatchId(id)
  };
  const updateRecordlist=(BatchId)=>{
    if(BatchId!=null){
      getRecordsUngenratedByBatch({
        batchId:BatchId,
        pageNum:page,
        pageSize:10
      }).then(res => {
        setList(res.data.data.list);
        setLastpage(res.data.data.lastPage)
      })
    }
  }
 const setCheckbox=(value)=>{
   setCheckBoxValue(value)
 }
  useEffect(() => {});
    // apiRecordGetList({}).then(res => {
    //   console.log('get res', res)
    //   setList(res.list);
    // })

  /**
   * 获取生成溯源的信息
   * @param batchId 批次id
   */
  return (
    <div>
      <Filter setCheckbox={setCheckbox} updateRecordlist={updateRecordlist} setCheckgroup={setCheckgroup} modifyId={modifyId} BatchId={BatchId} checkGroup={checkGroup}/>
      <RecordList setCheckbox={setCheckbox} checkValue={checkValue} recordList={list} BatchId={BatchId} setBatchId={setBatchId} isRoot={true} setCheckgroup={setCheckgroup} setPage={setPage} lastpage={lastpage}/>
    </div>
  );
}

