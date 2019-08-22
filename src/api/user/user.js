import {get, post} from "@/api/http";
import md5 from 'js-md5'
import cookie from 'js-cookie'
import {COOKIE_KEY} from "@/base/constants";

/**
 * 存储默认的请求，如果为组织的经理、负责人，则source默认为企业
 * 否则为source默认为个人
 * @param res: []
 */
function initSource(res) {
  let enterprises = res.enterpriseInfoVOList;
  // 默认source为用户
  let source = 0;
  let sourceId = res.userId;
  if (enterprises !== null && enterprises.length > 0) {
    // 存储
    let enterprise = enterprises[0];

    console.debug('enterprise', enterprise);
    if (enterprise.role !== "员工") {
      source = 1;
      sourceId = enterprise.enterpriseId;
    }
  }

  cookie.set(COOKIE_KEY.SOURCE_TYPE, source);
  cookie.set(COOKIE_KEY.SOURCE_ID, sourceId);
}

export function apiLogin(params) {
  params.password = md5(params.password);
  return new Promise(((resolve, reject) => {
    post('portal/user/login.do', params)
      .then(res => {
        // 登陆成功, 缓存到cookie中
        cookie.set(COOKIE_KEY.USER_ID, res.userId);
        cookie.set(COOKIE_KEY.USER, res)
        initSource(res);
        resolve(res);
      }).catch(err => reject(err));
  }))
}

export function apiUpdateUsername(username) {
  return post('portal/user/updateInfo.do', {
    key: 'username',
    value: username,
    userId: cookie.get(COOKIE_KEY.USER_ID)
  })
}



