import React, { useState, useEffect } from 'react';
import IceContainer from '@icedesign/container';
import { Table, Dialog, Message } from '@alifd/next';
import { withRouter, Link } from 'react-router-dom';
import ContainerTitle from './components/ContainerTitle';
import styles from './index.module.scss';
import {apiGetStockList, apiDeleteStock} from "@/api/input/input";
import {apiFieldGetList} from "@/api/product/field";
import EditDialog from "@/pages/Product/Field/components/FieldList/components/EditDialog";
import {apiCropGetSelectOptionList} from "@/api/product/crop";

function FieldList(props) {
  const [fieldList, setFieldList] = useState([]);
  const [cropList, setCropList] = useState([]);
  useEffect(() => {
    apiFieldGetList().then(res => setFieldList(res));

    // 获取农作物列表
    apiCropGetSelectOptionList().then(res => setCropList(res))
  },[]);

  const handleAdd = () => {

  };

  // 根据传入的id修改
  const handleDelete = (index) => {
    Dialog.confirm({
      content: '确认删除吗',
      onOk: () => {
        const data = [...dataSource];
        console.log(index);
        apiDeleteStock(data[index].id)
          .then(res => {
            // 删除成功
            data.splice(index, 1);
            // 重新渲染列表
            setFieldList(data);
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
        <EditDialog cropList={cropList} isAdd={false} field={fieldList[index]}/>
        &nbsp;&nbsp;
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
        title="田块管理"
        buttonText="新增"
        className={styles.title}
        cropList={cropList}
        onClick={handleAdd}
      />
      <Table dataSource={fieldList} hasHeader={true} hasBorder={false}>
        <Table.Column title="编号" dataIndex="id"/>
        <Table.Column title="田块名" dataIndex="name" />
        <Table.Column title="管理人" dataIndex="manager" />
        <Table.Column title="位置" dataIndex="location" />
        <Table.Column title="农作物" dataIndex="cropName" />
        <Table.Column title="面积(平方米)" dataIndex="square" />
        <Table.Column title="备注" dataIndex="remark" />
        <Table.Column title="操作" dataIndex="id" cell={renderOper} />
      </Table>
    </IceContainer>
  );
}

export default withRouter(FieldList);
