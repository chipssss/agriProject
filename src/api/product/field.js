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
  obj.isFree = obj.status === 0;
  obj.isPerson = obj.source === 0;
  obj.cropThirdCateId = 0;
  obj.userId = cookie.get(COOKIE_KEY.USER_ID);
  return isAdd ? apiFieldAdd(obj) : apiFieldInfoUpdate(obj);
}

function apiFieldAdd(obj) {
  return post('portal/field/fieldAdd.do', obj);
}

function apiFieldInfoUpdate(obj) {
  return post('portal/field/fieldModify.do', obj);
}
