import {post} from "@/api/http";
import {COOKIE_KEY} from "@/base/constants";
import cookie from 'js-cookie'

export function apiFieldGetList() {
  return post('portal/field/fieldInfo.do', {
    userId: cookie.get(COOKIE_KEY.USER_ID),
  });
}


/**
 * 处理田块信息模块， 添加田块 / 修改田块信息
 * @param obj 田块信息格式
 * @param isAdd true 添加田块
 */
export function apiHandleFieldChange(obj, isAdd) {
  obj.userId = cookie.get(COOKIE_KEY.USER_ID);
  return isAdd ? apiFieldAdd(obj) : apiFieldInfoUpdate(obj);
}

function apiFieldAdd(obj) {
  // 设置必填参数
  obj.isPerson = cookie.get(COOKIE_KEY.SOURCE_TYPE) === 0;
  obj.isFree = true;
  obj.square = obj.square ? obj.square : 0;
  return post('portal/field/fieldAdd.do', obj);
}

function apiFieldInfoUpdate(obj) {
  obj.isPerson = obj.source === 0;
  obj.isFree = obj.status === 0;
  return post('portal/field/fieldModify.do', obj);
}

export function apiFieldDelete(fieldId) {
  // 没有传入id，直接返回
  if (!fieldId) return;

  return post('portal/field/fieldDel.do', {fieldId: fieldId})
}
