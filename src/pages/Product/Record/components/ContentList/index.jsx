import React, {useState, useEffect} from 'react';
import Filter from './Filter';
import Lists from './Lists';
import {apiRecordGetList} from "@/api/record";

export default function Index() {
  const [recordList, setRecordList] = useState([]);

  useEffect(() => {
      requestData({});
  }, []);

  const requestData = (screenVal) => {
    apiRecordGetList(screenVal).then(res => {
      setRecordList(res);
    })
  };

  const handleScreenChange = (screenVal) => {
    // 重新拉取数据
    requestData(screenVal);
  };
  return (
    <div>
      <Filter onScreenChange={handleScreenChange} />
      <Lists recordList={recordList} />
    </div>
  );
}
