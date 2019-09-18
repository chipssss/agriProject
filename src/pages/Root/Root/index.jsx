import React, {useState, useEffect} from 'react';
import Filter from "@/pages/Root/Root/components/Filter";
import {apiRecordGetList} from "@/api/product/record";
import RecordList from '@/components/RecordList'
import {apiGetRootList} from "@/api/root/root";


export default function index(props) {
  const [list, setList] = useState([]);

  useEffect(() => {
    apiRecordGetList({}).then(res => {
      console.log('get res', res)
      setList(res.list);
    })
  }, []);

  const onPageChange = (page) => {
    // update page
    console.log('current page: ' + page);
  }

  /**
   * 获取生成溯源的信息
   * @param batchId 批次id
   */
  const getRootList = (batchId) => {
    apiGetRootList(batchId).then(res => setList(res))
  };

  return (
    <div>
      <Filter/>
      <RecordList recordList={list} isRoot={true} onPageChange={onPageChange}/>
    </div>
  );
}

