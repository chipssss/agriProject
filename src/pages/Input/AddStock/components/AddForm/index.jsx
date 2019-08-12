import React, { useState, useRef } from 'react';
import IceContainer from '@icedesign/container';
import { Grid, Input, Button, Message, Select } from '@alifd/next';
import {
  FormBinderWrapper,
  FormBinder,
  FormError,
} from '@icedesign/form-binder';
import styles from './index.module.scss';

const { Row, Col } = Grid;

export default function SimpleFluencyForm() {
  const [formValue] = useState({
    name: '',
    shortName: '',
  });
  const formEl = useRef(null);

  const formChange = (value) => {
    console.log(value);
  };

  const handleSubmit = () => {
    formEl.current.validateAll((errors, values) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }

      console.log('values:', values);
      Message.success('提交成功');
    });
  };

  return (
    <IceContainer title="新增库存" className={styles.form}>
      <FormBinderWrapper
        ref={formEl}
        value={formValue}
        onChange={formChange}
      >
        <div className={styles.formContent}>
          <Row className={styles.formRow}>
            <Col l="2" className={styles.formLabel}>
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
              <span>类别：</span>
            </Col>
            <Col l="3">
                <Select></Select>
            </Col>
              <Col l="3">
                <Select></Select>
            </Col>
              <Col l="3">
                <FormBinder name="name" required message="必填项">
                <Select></Select>
                </FormBinder>
              </Col>
              <div className={styles.formErrorWrapper}>
                <FormError name="name" />
              </div>
          </Row>

          <Row className={styles.formRow}>
            <Col l="2" className={styles.formLabel}>
              <span>数量：</span>
            </Col>
            <Col l="5">
              <FormBinder
                type="number"
                name="email"
                required
                message="请输入正确的数量"
              >
                <Input
                  maxLength={20}
                  placeholder="农资数量"
                  style={{ width: '300px' }}
                />
              </FormBinder>
              <div className={styles.formErrorWrapper}>
                <FormError name="email" />
              </div>
            </Col>
          </Row>

          <Row className={styles.formRow}>
            <Col l="2" className={styles.formLabel}>
              <span>角色：</span>
            </Col>
            <Col l="5">
              <FormBinder name="role">
                <Select style={{ width: '300px' }}>
                  <Select.Option value="member">评测员</Select.Option>
                  <Select.Option value="owner">主理人</Select.Option>
                </Select>
              </FormBinder>
              <div className={styles.formErrorWrapper}>
                <FormError name="role" />
              </div>
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
