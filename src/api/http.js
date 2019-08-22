import axios from 'axios';
import {SERVER} from "@/base/constants";

/**
 * 封装axios请求
 * @author: chips
 */
var instance = axios.create({
  baseURL: SERVER.BASE_URL,
  timeout: '6000',
  withCredentials: true
});
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/json';

// 拦截请求响应，当发生错误时，做出响应处理
instance.interceptors.response.use(function (res) {
  if (res.status === 200) {
    return Promise.resolve(res)
  } else {
    // 对status进行处理
    return Promise.reject(res)
  }
}, function (error) {
  // 根据页面状态码对应跳转
  return Promise.reject(error);
});

export function get(url, params) {
  return new Promise(((resolve, reject) => {
    instance.get(url, {
      params: params,
    })
      .then(res => {
        handleResponse(res, resolve, reject);
      })
      .catch(err => {
        reject(err)
      })
  }))
}

function handleResponse(res, resolve, reject) {
  if (res.data.status === CODE.SUCCESS) {
    resolve(res.data.data);
  } else {
    reject(res.data.msg);
  }
}

export function post(url, params) {
  return new Promise(((resolve, reject) => {
    instance.post(url, params)
      .then(res => {
        handleResponse(res, resolve, reject);
      })
      .catch((err => {
        reject(err.data)
      }))
  }))
}

const CODE = {
  SUCCESS: 0,
};
