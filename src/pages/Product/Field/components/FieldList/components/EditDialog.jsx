import React, {useState, useEffect, useRef} from 'react';
import {Button, Dialog, Form, Input, Select, Message} from '@alifd/next'
import stores from '@/stores'

/**
 * 引入ice formBinder目的是为了表单数据的双向绑定
 * 当用户操作为编辑时，数据自动填充到表单
 * doc: https://ice.work/component/formbinder
 */
import {FormBinderWrapper, FormBinder, FormError} from '@icedesign/form-binder'
import {apiCropGetSelectOptionList} from "@/api/product/crop";
import {apiHandleFieldChange} from "@/api/product/field";

const FormItem = Form.Item;
/**
 * 添加或修改
 * @param props
 *    isAdd 是添加还是修改 当为修改界面时，需要传入field
 * @returns {*}
 * @constructor
 */
export default function EditDialog(props) {
  const [fieldVal, setFieldVal] = useState({});

  const [visible, setVisible] = useState(false);
  const {cropList} = props;
  const [cropId, setCropId] = useState([]);

  const {isAdd, field, updateData} = props;
  const title = isAdd ? '新增田块' : '田块信息修改';
  const formRef = useRef(null);


  console.debug('field value: ' + field);
  useEffect(() => {
    if (field) {
      setFieldVal(field);
      setCropId(field.cropId)
      console.debug('set field value success')
    }
  },[]);

  const setCrop = cropId => {
    // 遍历寻找cropName
  debugger
    console.debug('find crop name')
    cropList.map(item => {
      if (item.value === cropId) {
        return item.label;
      }
    });
    return '';
  };

  const onOpen = (index, record) => {
    setVisible(true);
  };

  const onOk = () => {
    formRef.current.validateAll((error, values) => {
      if (error) {
        console.debug('error', values)
        return;
      }

      // 提交数据
      apiHandleFieldChange(values, isAdd).then(res => {
        Message.success(isAdd ? '添加成功' : '修改成功');
        setVisible(false);
      }).catch(err => {
        Message.warning('添加失败，' + err);
        updateData();
        setVisible(false);
      })
      console.debug('value', values);
    })
  };

  const onClose = () => {
    setVisible(false);
  };

  const configForm = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  return (
    <div style={styles.editDialog}>
      {
        isAdd ? (<Button type="primary" size="large" onClick={onOpen}>新增</Button>)
          : (<Button size="small" type="primary" onClick={onOpen}> 编辑</Button>)
      }
      <Dialog style={{width: 640}} title={title} visible={visible} onOk={onOk} onCancel={onClose} onClose={onClose}>
        <FormBinderWrapper
          ref={formRef}
          value={fieldVal}
        >
          <Form style={{width: '80%'}} {...configForm} >
            <FormItem label="田块名" >
              <FormBinder name="name" required message="请输入田块名">
                <Input/>
              </FormBinder>
              <FormError name="name"/>
            </FormItem>
            <FormItem label="农作物">
              <FormBinder name="cropId" valuePropName="cropId" setFiledValue={cropId => setCrop(cropId)}>
                <Select dataSource={cropList} style={{width: '100%'}}/>
              </FormBinder>
            </FormItem>
            <FormItem label="管理人">
              <FormBinder name="manager">
                <Input placeholder="选填"/>
              </FormBinder>
            </FormItem>
            <FormItem label="位置">
              <FormBinder name="location">
                <Input placeholder="选填"/>
              </FormBinder>
            </FormItem>
            <FormItem label="面积">
              <FormBinder name="square">
                <Input htmlType="number" placeholder="选填"/>
              </FormBinder>
            </FormItem>
            <FormItem label="备注">
              <FormBinder name="remark">
                <Input placeholder="选填"/>
              </FormBinder>
            </FormItem>
          </Form>
        </FormBinderWrapper>
      </Dialog>


    </div>
  );
}

const styles = {
  editDialog: {
    display: 'inline-block',
    marginRight: '5px',
  },
}
