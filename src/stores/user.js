/**
 * @author chips
 * 数据存储
 */
import cookie from 'js-cookie'
import {COOKIE_KEY} from "@/base/constants";

export default {
  user: {
    username: 'lin',
    type: '1',
    image: ''
  },

  async init() {
    // init cookie,get user
    this.user = cookie.getJSON(COOKIE_KEY.USER);
    if (this.user) {
      this.initUserType();
    }
  },

  initUserType() {
    switch (this.user.type) {
      case 0:
        this.user.showType = '管理部门';
        break;
      case 1:
        this.user.showType =  '消费者';
        break;
      case 2:
        this.user.showType =  '农户';
        break;
      case 3:
        this.user.showType =  '企业';
        break;
      case 4:
        this.user.showType =  '科研机构';
        break;
      case 5:
        this.user.showType =  '行业协会';
        break;
      case 6:
        this.user.showType =  '其他产业链';
        break;
      default:
        this.user.showType =  '';
    }
  },
}
