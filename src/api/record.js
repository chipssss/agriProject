/**
 * 生产记录相关
 * @param params
 * userId	是	number	用户id
   startTime	否	string	开始时间 格式”2019-07-29”
   endTime	否	string	结束时间
   fieldId		number	田块id 同下
   cropId		number	农作物id 批次id与农作物id必须存在一个或以上
 */
import {COOKIE_KEY} from "@/base/constants";
import {post} from "@/api/http";
import cookie from 'js-cookie'

export function apiRecordGetList(params) {
  params.userId = cookie.get(COOKIE_KEY.USER_ID);
  return post('portal/processRecord/processRecord.do', params);
}


