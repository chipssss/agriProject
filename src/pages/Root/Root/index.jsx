import React, {useState, useEffect} from 'react';
import Filter from "@/pages/Root/Root/components/Filter";
import RecordContainer from "@/pages/Root/Root/components/RecordContainer";
import {apiRecordGetList} from "@/api/product/record";


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
      <RecordContainer recordList={list}/>
    </div>
  );
}
