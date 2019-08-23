import {get, post} from "@/api/http";
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
 *
 *  根据角色获取农资
 */
export function apiGetStockList(params) {
  // 设置source
  params.sourceId = cookie.get(COOKIE_KEY.SOURCE_ID);
  params.source = cookie.get(COOKIE_KEY.SOURCE_TYPE);

  return post('portal/input/infoGet.do', params);
}

export function apiGetStockSum() {
  // 设置source
  return post('portal/input/sumGet.do', {
    sourceId: cookie.get(COOKIE_KEY.SOURCE_ID),
    source: cookie.get(COOKIE_KEY.SOURCE_TYPE)
  })
}

/**
 *
 * @param idVal 需删除的Id
 * id	是	int	类别表或者农资表id
 * flag	是	int	0, 表示删除农资
 * source	是	int	0为表示用户，1表示企业
 */
export function apiDeleteStock(idVal) {
  return post('portal/input/inputDel.do', {
    id: idVal,
    flag: 0,
    source: cookie.get(COOKIE_KEY.SOURCE_TYPE)
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

/**
 * 获取农资类别，并转化成级联选项格式
 * @returns {Promise<unknown>}
 */
export function apiInputGetCate() {
  return new Promise(((resolve, reject) => {
    get('portal/input/categoryInfo.do').then(res => {
      let data = [];
      // 转换数据格式
      res.map((item, index) => {
        let dataItem = {
          "value": item.inputFirstCate.id,
          "label": item.inputFirstCate.name,
          "children": []
        };
        item.inputSecondCates.map((item, index) => {
          dataItem.children.push({
            "value": item.id,
            "label": item.name
          })
        });
        if (dataItem.children.length > 0) {
          data.push(dataItem)
        }
      })
      resolve(data);
    }).catch(reject)
  }))
}

/**
 * 格式
 * categoryId	是	int	类别id
   name	是	string	名称
   specification	是	string	昵称
   price	是	decimal	价格
   productionTime	是	date	生产日期 规范：1999-01-01
   shelfLife	是	int	保质期
   manufacturer	是	string	生产厂商
   remark	否	string	备注，描述
   source	是	int	来源,默认为0用户添加，1企业领用
   sourceId	否	int	企业投入品信息id
   quantity	是	number	农资数量
 * @param params
 */
export function apiInputPurchase(params) {
  params.source = cookie.get(COOKIE_KEY.SOURCE_TYPE);
  params.sourceId = cookie.get(COOKIE_KEY.SOURCE_ID);
  return post('portal/input/purchase.do',params);
}
