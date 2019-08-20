/** 采摘相关的api数据处理 **/
import {post} from "@/api/http";
import cookie from 'js-cookie'
import {COOKIE_KEY} from "@/base/constants";
import {getDate} from "@/base/utils";

export function apiPickGetList() {
  return post('portal/processRecord/getRecoveryRecord.do',
    {
      source: cookie.get(COOKIE_KEY.SOURCE_TYPE),
      sourceId: cookie.get(COOKIE_KEY.SOURCE_ID)
    });
}

/**
 * 采摘记录生成批次
 * @param pickRecord 采摘月份
 * @param start
 */
export function apiPickAddBatch(pickRecord, start) {
  let name = `${pickRecord.fieldName},${pickRecord.crop}${getDate()}`
  return post('portal/processRecord/batchAdd.do', {
    name: name,
    fieldId: pickRecord.fieldId,
    plantTime: start,
    // substring， 截取时间， 保证时间格式合适
    collectTime: pickRecord.createTime.substring(0, 10),
    recoveryRecordId: pickRecord.id
  })
}
