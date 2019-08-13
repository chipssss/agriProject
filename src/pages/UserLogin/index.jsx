import React, { useState, useRef } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Input, Button, Checkbox, Message } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import FoundationSymbol from '@icedesign/foundation-symbol';
import styles from './index.module.scss';
import {apiLogin} from "@/api/user";

function UserLogin(props) {

  const [formValue, setFormValue] = useState({
    phonenum: '',
    password: '',
    checkbox: false,
  });
  const formEl = useRef(null);

  const formChange = (value) => {
    setFormValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formEl.current.validateAll((errors, values) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }
      console.log(values);
      apiLogin(formValue).then(res => {
        // 登陆成功
        Message.success('登录成功');

        // 将user存储到store中
        props.history.push('/');
        //
      }).catch(err => {
        Message.warning('登陆失败，' + err);
      });
    });
  };

  const checkPhone = (rules, values, callback) => {
    let reg = /^1[3|4|5|7|8][0-9]{9}$/;
    if (!values || !reg.test(values)) {
      callback('请输入正确的手机号码')
    } else {
      callback();
    }
  };

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>登 录</h4>
      <IceFormBinderWrapper
        value={formValue}
        onChange={formChange}
        ref={formEl}
      >
        <div className={styles.formItems}>
          <div className={styles.formItem}>
            <FoundationSymbol type="person" size="small" className={styles.inputIcon} />
            <IceFormBinder name="phonenum" required validator ={checkPhone}>
              <Input
                maxLength={11}
                placeholder="手机号"
                className={styles.inputCol}
              />
            </IceFormBinder>
            <IceFormError name="phonenum" />
          </div>

          <div className={styles.formItem}>
            <FoundationSymbol type="lock" size="small" className={styles.inputIcon} />
            <IceFormBinder name="password" required message="请输入正确密码">
              <Input
                htmlType="password"
                placeholder="密码"
                className={styles.inputCol}
              />
            </IceFormBinder>
            <IceFormError name="password" />
          </div>

          <div className={styles.formItem}>
            <IceFormBinder name="checkbox">
              <Checkbox className={styles.checkbox}>记住账号</Checkbox>
            </IceFormBinder>
          </div>

          <div className={styles.footer}>
            <Button
              type="primary"
              onClick={handleSubmit}
              className={styles.submitBtn}
            >
              登 录
            </Button>
            <Link to="/user/register" className={styles.tips}>
              立即注册
            </Link>
          </div>
        </div>
      </IceFormBinderWrapper>
    </div>
  );
}

export default withRouter(UserLogin);
