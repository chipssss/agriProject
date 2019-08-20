import React, { useState, useEffect } from 'react';
import IceContainer from '@icedesign/container';
import { Table, Dialog, Message } from '@alifd/next';
import { withRouter, Link } from 'react-router-dom';
import ContainerTitle from '@/components/ContainerTitle';
import styles from './index.module.scss';
import {apiGetPersonStockList, apiDeletePersonStock} from "@/api/input/input";

function MemberList(props) {
  const [dataSource, setDataSource] = useState({});

  useEffect(() => {
    apiGetPersonStockList({}).then(res => {
      setDataSource(res)
    })
  },[]);

  const handleAdd = () => {
    props.history.push('/input/add');
  };

  // 根据传入的id修改
  const handleDelete = (index) => {
    Dialog.confirm({
      content: '确认删除吗',
      onOk: () => {
        const data = [...dataSource];
        console.log(index);
        apiDeletePersonStock(data[index].id)
          .then(res => {
            // 删除成功
            data.splice(index, 1);
            // 重新渲染列表
            setDataSource(data);
          })
          .catch(err => {
            // 删除失败
            Message.error('删除失败，' + err)
          })
      },
    });
  };

  const renderOper = (value, index) => {
    return (
      <div>
        <a
          onClick={() => handleDelete(index)}
          className={styles.link}
        >
          删除
        </a>
      </div>
    );
  };

  return (
    <IceContainer className={styles.container}>
      <ContainerTitle
        title="农资库存"
        buttonText="新增"
        className={styles.title}
        onClick={handleAdd}
      />
      <Table dataSource={dataSource} hasHeader={true} hasBorder={false}>
        <Table.Column title="编号" dataIndex="id"/>
        <Table.Column title="农资名" dataIndex="name" />
        <Table.Column title="余量" dataIndex="quantity" />
        <Table.Column title="规格" dataIndex="specification" />
        <Table.Column title="价格" dataIndex="price" />
        <Table.Column title="来源" dataIndex="personOrEnterpriseName" />
        <Table.Column dataIndex="id" cell={renderOper} />
      </Table>
    </IceContainer>
  );
}

export default withRouter(MemberList);
