import React, {useState, useEffect} from 'react';
import IceContainer from '@icedesign/container';
import {Message, Button} from '@alifd/next';
import CustomTable from './components/CustomTable';


export default function TabTable(props) {
  const [inputList, setInputList] = useState([]);

  useEffect(() => {
    requestData();
  }, []);

  const requestData = () => {

  };

  const onAgree = (index, id) => {

  };

  const onRefuse = (index, id) => {

  };

  const columns = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '农资名',
      dataIndex: 'inputName',
      key: 'inputName',
    },
    {
      title: '领取人',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: '时间',
      dataIndex: 'creatTime',
      key: 'creatTime',
    },
    {
      title: '操作',
      key: 'action',
      dataIndex: 'id',
      render: (value, index, record, id) => {
        return (
          <span>
          <Button
            size="small"
            type="primary"
            onClick={() => onAgree(index, record.id)}
          >通过</Button>
             <Button
               size="small"
               type="danger"
               onClick={() => onRefuse(index, record.id)}
             >未通过</Button>
            </span>
        );
      },
    },
  ];

  return (
    <div>
      <IceContainer title={"农资审核"}>
        <CustomTable
          dataSource={inputList}
          columns={columns}
          hasBorder={false}
        />
      </IceContainer>
    </div>
  );
}
