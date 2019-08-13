import {post} from "@/api/http";
import {COOKIE_KEY} from "@/base/constants";
import cookie from 'js-cookie'

export function apiFieldGetList() {
  return post('portal/field/fieldInfo.do', {
    userId: cookie.get(COOKIE_KEY.USER_ID)
  });
}
