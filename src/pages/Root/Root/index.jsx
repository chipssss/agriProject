import React, {useState, useEffect} from 'react';
import Filter from "@/pages/Root/Root/components/Filter";
import {apiRecordGetList} from "@/api/product/record";
import RecordList from '@/components/RecordList'


export default function index(props) {
  const [list, setList] = useState([]);

  useEffect(() => {
    apiRecordGetList({}).then(res => {
      console.log('get res', res)
      setList(res.list);
    })
  }, []);

  return (
    <div>
      <Filter/>
      <RecordList recordList={list} isRoot={true}/>
    </div>
  );
}
