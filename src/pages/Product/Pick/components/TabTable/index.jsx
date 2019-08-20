import React, { useState, useEffect } from 'react';
import IceContainer from '@icedesign/container';
import { Tab,Message } from '@alifd/next';
import CustomTable from './components/CustomTable';
import EditDialog from './components/EditDialog';
import DeleteBalloon from './components/DeleteBalloon';
import styles from './index.module.scss'
import {apiPickGetList} from "@/api/product/pick";

const TabPane = Tab.Item;

const tabs = [
  { tab: '采摘', key: 'uncreated' },
  { tab: '已生成批次', key: 'created' }
];

export default function TabTable() {
  const [pickList, setPickList] = useState([]);
  const [tabKey, setTabKey] = useState('uncreated');

  useEffect(() => {
    requestData();
  }, []);

  const requestData = () => {
    apiPickGetList().then(res => {
      setPickList(res);
    }).catch(err => Message.error('数据获取失败，' + err))
  }


  const getFormValues = (dataIndex, values) => {
    requestData();
  };

  const handleTabChange = (key) => {
    setTabKey(key);
  };

  const columns = [
    {
      title: '田块名',
      dataIndex: 'fieldName',
      key: 'fieldName',
    },
    {
      title: '农作物',
      dataIndex: 'crop',
      key: 'crop',
    },
    {
      title: '操作员',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '采摘时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      dataIndex: 'id',
      render: (value, index, record, id) => {
        return (
          tabKey === 'uncreated'? (
          <span>
            <EditDialog
              index={index}
              record={record}
              id={id}
              getFormValues={getFormValues}
            />
          </span>): null
        );
      },
    },
  ];

  return (
    <div>
      <IceContainer>
        <Tab onChange={handleTabChange}>
          {tabs.map((item) => {
            return (
              <TabPane title={item.tab} key={item.key}>
                <CustomTable
                  dataSource={pickList[item.key]}
                  columns={columns}
                  hasBorder={false}
                />
              </TabPane>
            );
          })}
        </Tab>
      </IceContainer>
    </div>
  );
}
