import React, {useState, useEffect} from 'react';
import Filter from './Filter';
import {apiRecordGetList} from "@/api/product/record";
import RecordList from '@/components/RecordList'

export default function Index() {
  const [recordList, setRecordList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
      requestData({});
  }, []);
  const screen = {};

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
  return (
    <div>
      <Filter onScreenChange={handleScreenChange} />
      <RecordList recordList={recordList} pages={totalPages} onPageChange={handlePageChange}/>
    </div>
  );
}
