import {post} from "@/api/http";
import cookie from 'js-cookie'
import {COOKIE_KEY} from "@/base/constants";

/**
 *
 * @param params object
 *  firstCateId	number	一类目录id 默认“所有”，即为0或不需要填写
 *  secondCateId	number	二类目录id 默认“所有“，即为0或不需要填写，如果有二级类别id则不读取一级id
 *  orderBy	string	价格price，时间create_time，数量quantity 例子：price_desc 或者 price_asc 默认：create_time_desc
 *  不需要传入 sourceId	number	无
 *  不需要传入 source	number	来源，0为用户，1为企业
 *  pageNum	number	页码 默认1
 *  pageSize	number	每页显示数量 默认为10
 */
export function apiGetPersonStockList(params) {
  // 设置source
  params.sourceId = cookie.get(COOKIE_KEY.USER_ID);
  params.source = 0;

  return post('portal/input/infoGet.do', params);
}

export function apiGetPersonStockSum() {
  // 设置source
  return post('portal/input/sumGet.do', {
    sourceId: cookie.get(COOKIE_KEY.USER_ID),
    source: 0
  })
}

/**
 *
 * @param idVal 需删除的Id
 * id	是	int	类别表或者农资表id
 * flag	是	int	0, 表示删除农资
 * source	是	int	0为表示用户，1表示企业
 */
export function apiDeletePersonStock(idVal) {
  return post('portal/input/inputDel.do', {
    id: idVal,
    flag: 0,
    source: 0
  })
}

/**
 * 记录获取， 分角色，企业/个人， 企业经理和负责人能够获取企业的记录
 * 一次性获取四种类别的记录
 * source	number	源，0为用户，1为企业
   sourceId	number	无
   type	number	判断type，购入/领用/退回/使用 为 1/2/3/4
 *
 */
export function apiInputRecordGetList() {
  let postVal = {
    source: cookie.get(COOKIE_KEY.SOURCE_TYPE),
    sourceId: cookie.get(COOKIE_KEY.SOURCE_ID),
    type: 1
  };
  let resultVal = {
    buy: null,
    receive: null,
    exit: null,
    use: null
  };
  let url = 'portal/input/recordGet.do';
  return new Promise((resolve, reject) => {
    post(url, postVal).then(result => {
      resultVal.buy = result;
      postVal.type = 2;
      post(url, postVal).then(result => {
        resultVal.receive = result;
        postVal.type = 3;
        post(url, postVal).then(result => {
          resultVal.exit = result;
          postVal.type = 4;
          post(url, postVal).then(result => {
            resultVal.use = result;
            resolve(resultVal)
          })
        })
      })
    }).catch(err => reject(err));
  })
}


