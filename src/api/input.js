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
export function apiGetStockList(params) {
  // 设置source
  params.sourceId = cookie.get(COOKIE_KEY.USER_ID);
  params.source = 0;

  return post('input/infoGet.do', params);
}

/**
 *
 * @param idVal 需删除的Id
 * id	是	int	类别表或者农资表id
 * flag	是	int	0, 表示删除农资
 * source	是	int	0为表示用户，1表示企业
 */
export function apiDeletePersonStock(idVal) {
  return post('input/inputDel.do', {
    id: idVal,
    flag: 0,
    source: 0
  })
}
