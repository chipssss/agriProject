import React, { useState, useRef, useEffect } from 'react';
import IceContainer from '@icedesign/container';
import { Grid, Input, Button, Message, Select, CascaderSelect, DatePicker } from '@alifd/next';
import {
  FormBinderWrapper,
  FormBinder,
  FormError,
} from '@icedesign/form-binder';
import styles from './index.module.scss';
import {apiInputGetCate, apiInputPurchase} from "@/api/input/input";
import {numberValidator} from '@/base/utils'
const { Row, Col } = Grid;

/**
 * 表单校验可以参考该界面功能
 * @returns {*}
 * @constructor
 */
export default function SimpleFluencyForm() {
  const [cateList, setCateList] = useState([]);
  const [formValue] = useState({
    name: '',
    specification: '',
    manufacturer: ''
  });
  const formEl = useRef(null);

  useEffect(() => {
    apiInputGetCate().then(res => setCateList(res))
  }, []);


  // 提交数据
  const handleSubmit = () => {
    formEl.current.validateAll((errors, values) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }

      console.log('values:', values);
      apiInputPurchase(values).then(res => Message.success('添加成功'))
        .catch(err => Message.error('添加失败,' + err))
    });
  };

  const onCascaderSelectChange = (value) => {
    console.log('selectValue id: ' + value)
  };
  return (
    <IceContainer title="新增库存" className={styles.form}>
      <FormBinderWrapper
        ref={formEl}
        value={formValue}
      >
        <div className={styles.formContent}>
          <Row className={styles.formRow}>
            <Col l="2" className={styles.formLabel}>
              <span className={styles.formLabelRequired}>*</span>
              <span>名称：</span>
            </Col>
            <Col l="5">
              <FormBinder name="name" required message="必填项">
                <Input placeholder="农资名" style={{ width: '300px' }} />
              </FormBinder>
              <div className={styles.formErrorWrapper}>
                <FormError name="name" />
              </div>
            </Col>
          </Row>

          <Row className={styles.formRow}>
            <Col l="2" className={styles.formLabel}>
              <span className={styles.formLabelRequired}>*</span>
              <span>类别：</span>
            </Col>
            <Col l="5">
              <FormBinder name="categoryId" required message="请选择农资类别">
                <CascaderSelect dataSource={cateList} style={{ width: '300px' }}
                                onChange={onCascaderSelectChange}/>
              </FormBinder>
            </Col>
          </Row>

          <Row className={styles.formRow}>
            <Col l="2" className={styles.formLabel}>
              <span className={styles.formLabelRequired}>*</span>
              <span>数量：</span>
            </Col>
            <Col l="5">
              <FormBinder
                name="quantity"
                required
                validator={numberValidator}
              >
                <Input
                  maxLength={20}
                  placeholder="农资数量"
                  style={{ width: '300px' }}
                />
              </FormBinder>
              <div className={styles.formErrorWrapper}>
                <FormError name="quantity" />
              </div>
            </Col>
          </Row>

          <Row className={styles.formRow}>
            <Col l="2" className={styles.formLabel}>
              <span className={styles.formLabelRequired}>*</span>
              <span>价格：</span>
            </Col>
            <Col l="5">
              <FormBinder
                name="price" required validator={numberValidator}
              >
                <Input
                  placeholder="单位：元"
                  style={{ width: '300px' }}
                />
              </FormBinder>
              <div className={styles.formErrorWrapper}>
                <FormError name="price" />
              </div>
            </Col>
          </Row>

          <Row className={styles.formRow}>
            <Col l="2" className={styles.formLabel}>
              <span className={styles.formLabelRequired}>*</span>
              <span>生产时间：</span>
            </Col>
            <Col l="5">
              <FormBinder
                name="productionTime">
                <DatePicker
                  style={{ width: '300px' }}
                />
              </FormBinder>
              <div className={styles.formErrorWrapper}>
                <FormError name="role" />
              </div>
            </Col>
          </Row>

          <Row className={styles.formRow}>
            <Col l="2" className={styles.formLabel}>
              <span className={styles.formLabelRequired}>*</span>
              <span>保质期：</span>
            </Col>
            <Col l="5">
              <FormBinder
                required validator={numberValidator}
                name="shelfLife">
                <Input
                  placeholder="单位：月"
                  style={{ width: '300px' }}
                />
              </FormBinder>
              <div className={styles.formErrorWrapper}>
                <FormError name="role" />
              </div>
            </Col>
          </Row>


          <Row className={styles.formRow}>
            <Col l="2" className={styles.formLabel}>
              <span>规格：</span>
            </Col>
            <Col l="5">
              <FormBinder
                name="specification">
                <Input
                  placeholder="选填"
                  style={{ width: '300px' }}
                />
              </FormBinder>
              <div className={styles.formErrorWrapper}>
                <FormError name="role" />
              </div>
            </Col>
          </Row>


          <Row className={styles.formRow}>
            <Col l="2" className={styles.formLabel}>
              <span>厂商：</span>
            </Col>
            <Col l="5">
              <FormBinder
                name="manufacturer">
                <Input
                  placeholder="选填"
                  style={{ width: '300px' }}
                />
              </FormBinder>
              <div className={styles.formErrorWrapper}>
                <FormError name="role" />
              </div>
            </Col>
          </Row>

          <Row className={styles.formRow}>
            <Col l="2" className={styles.formLabel}>
              <span>备注：</span>
            </Col>
            <Col l="5">
              <FormBinder
                name="remark">
                <Input
                  placeholder="选填"
                  style={{ width: '300px' }}
                />
              </FormBinder>
            </Col>
          </Row>


          <Row>
            <Col offset="2">
              <Button onClick={handleSubmit} type="primary">
                确认
              </Button>
            </Col>
          </Row>
        </div>
      </FormBinderWrapper>
    </IceContainer>
  );
}
