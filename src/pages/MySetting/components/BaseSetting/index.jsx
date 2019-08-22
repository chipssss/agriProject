import React, { useState, useRef, useEffect } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Button, Radio,  Grid, Message } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import styles from './index.module.scss';
import icestore from "@/stores";
import {apiUpdateUsername} from "@/api/user/user";

const { Row, Col } = Grid;

export default function BaseSetting() {
  const [formVal, setFormVal] = useState({
    username: ''
  });
  const formEl = useRef(null);
  const store = icestore.useStore('user');
  const {user, enterprise, updateUsername} = store;

  useEffect(() => {
    setFormVal({
      username: user.username
    })
  }, []);

  console.debug('ui enterprise', enterprise);
  const validateAllFormField = () => {
    formEl.current.validateAll((errors, values) => {
      console.log('errors', errors, 'values', values);

      // 更新用户名
      apiUpdateUsername(values.username).then(res => {
        // 更新成功，反馈
        Message.success('更新成功')
        // 更新store user值
        updateUsername(values.username)
      }).catch(err => Message.error('更新失败，' + err))
    });
  };

  return (
    <IceContainer>
      <IceFormBinderWrapper value={formVal} ref={formEl}>
        <div className={styles.formContent}>
          <h2 className={styles.formTitle}>个人信息</h2>
          <Row className={styles.formItem}>
            <Col xxs="6" s="3" l="3" className={styles.label}>
              姓名：
            </Col>
            <Col s="12" l="10">
              <IceFormBinder name="username" required  message="必填">
                <Input className={styles.inputItem}   />
              </IceFormBinder>
              <IceFormError name="username" />
            </Col>
          </Row>
          <Row className={styles.formItem}>
            <Col xxs="6" s="3" l="3" className={styles.label}>
              手机号：
            </Col>
            <Col s="12" l="10">
              {user.phonenum}
            </Col>
          </Row>

          <Row className={styles.formItem}>
            <Col xxs="6" s="3" l="3" className={styles.label}>
              用户类别 ：
            </Col>
            <Col s="12" l="10">
              {user.showType}
            </Col>
          </Row>


          <Row className={styles.formItem}>
            <Col xxs="6" s="3" l="3" className={styles.label}>
              所属企业：
            </Col>
            <Col s="12" l="10">
              {enterprise.name}
            </Col>
          </Row>

          <Row className={styles.formItem}>
            <Col xxs="6" s="3" l="3" className={styles.label}>
              职位：
            </Col>
            <Col s="12" l="10">
              {enterprise.role}
            </Col>
          </Row>
        </div>
      </IceFormBinderWrapper>

      <Row style={{ marginTop: 20 }}>
        <Col offset="3">
          <Button
            type="primary"
            style={{ width: 100 }}
            onClick={validateAllFormField}
          >
            更新设置
          </Button>
        </Col>
      </Row>
    </IceContainer>
  );
}
