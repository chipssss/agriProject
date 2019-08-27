import cookie from 'js-cookie'
import {COOKIE_KEY} from "@/base/constants";

export function cookieSaveForm(userForm) {
  cookie.set(COOKIE_KEY.USER_FORM, userForm);
}

export function cookieGetUserForm() {
  return cookie.getJSON(COOKIE_KEY.USER_FORM);
}

export function cookieClear() {
  cookie.set(COOKIE_KEY.USER_FORM, null);
}
