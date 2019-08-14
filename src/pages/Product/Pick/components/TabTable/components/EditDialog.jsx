import React, { useState } from 'react';
import { Dialog, Button, Form, Field, Select } from '@alifd/next';
const FormItem = Form.Item;

const field = new Field({
  onChange: (name, value) => {
    field.setValue(`sync`,)
  }
});
const init = field.init;

export default function EditDialog(props) {
  const { index, record } = props;
  const [visible, setVisible] = useState(false);
  const [dataIndex, setDataIndex] = useState(null);
  const [validateState, setValidateState] = useState("error");

  const handleSubmit = () => {
    field.validate((errors, values) => {
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }

      props.getFormValues(dataIndex, values);
      setVisible(false);
    });
  };

  const onOpen = (index, record) => {
    field.setValues({ ...record });
    setVisible(true);
    setDataIndex(index);
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
        编辑
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
        <Form field={field}>
          <FormItem label="起始时间：" {...formItemLayout}>
            <Select style={{width: 400}} defaultValue={"1"}>
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
