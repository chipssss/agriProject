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
 * @param num， xx个月
 */
export function apiPickAddBatch(pickRecord, num) {
  let currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth()-num);
  let start = currentDate.Format('yyyy-MM-dd');
  let name = `${pickRecord.fieldName},${pickRecord.crop}${getDate()}`
  return post('portal/processRecord/batchAdd.do', {
    name: name,
    fieldId: pickRecord.fieldId,
    plantTime: start,
    collectTime: pickRecord.createTime
    // todo 待增加采摘id
  })
}
