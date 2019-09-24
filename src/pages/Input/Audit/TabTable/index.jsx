import React, {useState, useEffect} from 'react';
import IceContainer from '@icedesign/container';
import {Message, Button} from '@alifd/next';
import CustomTable from './components/CustomTable';
import {apiInputAudit, apiInputGetAuditList, AUDIT_CODE} from "@/api/input/inputAudit";


export default function TabTable(props) {
  const [inputList, setInputList] = useState([]);

  useEffect(() => {
    requestData();
  }, []);

  const requestData = () => {
    apiInputGetAuditList().then(setInputList);
  };

  const onAgree = (index, id) => {
    handleAudit(index, id, AUDIT_CODE.AGREE);
  };

  const onRefuse = (index, id) => {
    handleAudit(index, id, AUDIT_CODE.REFUSE);
  };

  /**
   * 处理审核，审核成功后本地刷新表单
   * @param index 审核项的下标
   * @param id 对应id
   * @param auditCode 审核码， ref: AUDIT_CODE
   */
  const handleAudit = (index, id, auditCode) => {
    apiInputAudit(id, auditCode).then(res => {
      Message.success('审核成功');
      // 本地刷新
      let tempList = [...inputList];
      tempList.splice(index, 1);
      setInputList(tempList);
    }).catch(err => {
      Message.warning('审核失败' + err);
    })
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
      dataIndex: 'createTime',
      key: 'createTime',
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
            &nbsp; &nbsp;
             <Button
               size="small"
               type="primary"
               warning
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
