import {get} from "@/api/http";
import cookie from 'js-cookie'
import {COOKIE_KEY} from "@/base/constants";
export function apiGetAllBatch() {
  return get('portal/processRecord/getBatchesByExistProcessRecord.do',
    {userId: cookie.get(COOKIE_KEY.USER_ID)})
}
