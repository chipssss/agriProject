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

  /**
   * 暂时存储第一个企业
   * 未来会出现一个企业多个员工的模型
   */
  enterprise: {
    id: 0,
    name: '温氏企业',
    role: '员工'
  },

  async init() {
    // init cookie,get user
    this.user = cookie.getJSON(COOKIE_KEY.USER);
    if (this.user) {
      this.initUserType();
      this.initEnterprise();
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

  initEnterprise() {
    let enterprises = this.user.enterpriseInfoVOList;
    if (enterprises !== null && enterprises.length > 0) {
      // 存储
      let enterprise = enterprises[0];
      this.enterprise.id = enterprise.enterpriseId;
      this.enterprise.name = enterprise.enterpriseName;
      this.role = enterprise.role;
      console.log('enterprise', enterprises)
    }
  },
}
