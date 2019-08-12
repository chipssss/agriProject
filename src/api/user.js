import {get, post} from "@/api/http";
import md5 from 'js-md5'
import cookie from 'js-cookie'
import {COOKIE_KEY} from "@/base/constants";

export function apiLogin(params) {
  params.password = md5(params.password);
  return new Promise(((resolve, reject) => {
    post('user/login.do', params)
      .then(res => {
        // 登陆成功, 缓存到cookie中
        cookie.set(COOKIE_KEY.USER_ID, res.userId);
        // todo source
        cookie.set(COOKIE_KEY.SOURCE_TYPE, 0);
        cookie.set(COOKIE_KEY.USER, res)
        resolve(res);
      }).catch(err => reject(err));
  }))
}



