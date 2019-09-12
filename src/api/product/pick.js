/** 采摘相关的api数据处理 **/
import {get, post} from "@/api/http";
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
export function apiPickAddBatch(pickRecord, formVal) {
  return post('portal/processRecord/batchAdd.do', {
    quantity: formVal.quantity,
    fieldId: pickRecord.fieldId,
    plantTime: formVal.plantTime,
    // substring， 截取时间， 保证时间格式合适
    collectTime: pickRecord.createTime.substring(0, 10),
    recoveryRecordId: pickRecord.id,
    finish: 0,
  })
}

/**
 * 获取用于生成批次的生产记录（筛选过已经生成批次的信息）
 * @param fieldId 必填，田块id
 * @returns {*|Promise|Promise<unknown>}
 */
export function apiPickGetRecord(fieldId) {
  return new Promise((resolve, reject) => post('portal/processRecord/getRecordsUngenratedByField.do', {
    fieldId: fieldId,
    pageSize: 1,
    pageNum: 999
    }).then(res => resolve(res.list))
      .catch(reject)
  );
}
