import React, { useState, useEffect } from 'react';
import IceContainer from '@icedesign/container';
import { Tab,Message } from '@alifd/next';
import styles from './index.module.scss'
import {apiInputRecordGetList} from "@/api/input/input";
import CustomTable from "@/pages/Product/Pick/components/TabTable/components/CustomTable";

const TabPane = Tab.Item;

const tabs = [
  { tab: '使用', key: 'use' },
  { tab: '购入', key: 'buy' },
  { tab: '领用', key: 'receive' },
  { tab: '退回', key: 'exit' }
];

export default function TabTable() {
  const [recordOj, setRecordOj] = useState({});
  const [tabKey, setTabKey] = useState('use');

  useEffect(() => {
    apiInputRecordGetList().then(result => {
      console.debug('result: ' + result);
      setRecordOj(result);
    })
  }, []);



  const handleTabChange = (key) => {
    setTabKey(key);
  };

  const columns = [
    {
      title: '编码',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '农资名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: '来源',
      dataIndex: 'source',
      key: 'source',
    },
    {
      title: '时间',
      dataIndex: 'createTime',
      key: 'createTime',
    }
  ];

  return (
    <div style={styles.tabtable}>
      <IceContainer>
        <Tab onChange={handleTabChange}>
          {tabs.map((item) => {
            return (
              <TabPane title={item.tab} key={item.key}>
                <CustomTable
                  dataSource={recordOj[item.key]}
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
