/**
 * @author chips;
 * @date 190923
 * @description 农资审核相关接口
 */
import {get, post} from "@/api/http";

/**
 * 获取农资列表
 * @returns {*|Promise|Promise<unknown>}
 */
export function apiInputGetAuditList() {
  return get('portal/input/inputConsumeList.do');
}

/**
 * 农资审核接口
 * @param params
 * pattern:
 * id   是  int  审核表id
 status  是  string  状态码 1为通过，2为拒绝, AUDIT_CODE
 * @returns {*|Promise|Promise<unknown>}
 */
export function apiInputAudit(inputId, auditCode) {
  return post('portal/input/inputConsumeReview.do', {
    id: inputId,
    status: auditCode,
  });
}

export const AUDIT_CODE = {
  AGREE: 1,
  REFUSE: 2,
};
