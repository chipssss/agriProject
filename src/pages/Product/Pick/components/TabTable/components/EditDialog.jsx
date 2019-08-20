import React, { useState, useRef } from 'react';
import { Dialog, Button, Form, Message, Select } from '@alifd/next';
import {apiPickAddBatch} from "@/api/product/pick";
const FormItem = Form.Item;

export default function EditDialog(props) {
  const { index, record, getFormValues } = props;
  const [visible, setVisible] = useState(false);

  const handleSubmit = () => {
    console.debug('current select: ' + selectValue);
    console.debug('current record: ' + record);
    apiPickAddBatch(record, selectValue).then(res => {
      // 添加批次成功
      Message.success('添加批次成功')
      getFormValues();
    }).catch(err => {
      Message.error('添加失败，'+ err)
    });
    setVisible(false);
  };

  let selectValue = 1;
  const onSelectChange = (value) => {
    selectValue = value;
  };

  const onOpen = (index, record) => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const formItemLayout = {
    labelCol: {
      fixedSpan: 6,
    },
    wrapperCol: {
      span: 14,
    }
  };


  return (
    <div style={styles.editDialog}>
      <Button
        size="small"
        type="primary"
        onClick={() => onOpen(index, record)}
      >
        生成批次
      </Button>
      <Dialog
        style={{ width: 640 }}
        visible={visible}
        onOk={handleSubmit}
        closeable="esc,mask,close"
        onCancel={onClose}
        onClose={onClose}
        title="生成批次"
      >
        <Form>
          <FormItem label="起始时间：" {...formItemLayout} required>
            <Select style={{width: 400}} defaultValue={"1"} name="select" onChange={onSelectChange}>
              <Select.Option value={"1"}>一个月内</Select.Option>
              <Select.Option value={"2"}>两个月内</Select.Option>
              <Select.Option value={"3"}>三个月内</Select.Option>
              <Select.Option value={"6"}>六个月内</Select.Option>
              <Select.Option value={"12"}>一年内</Select.Option>
            </Select>
          </FormItem>
        </Form>
      </Dialog>
    </div>
  );
}

const styles = {
  editDialog: {
    display: 'inline-block',
    marginRight: '5px',
  },
};
