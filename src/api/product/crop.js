import {get} from "@/api/http";

// 返回的数据格式设计不太合理，四级级别，子项的数据项应统一为children
function convertType(res) {
  let result = [];
  // 数据转化
  res.map((value) => {
    // 第一级
    let item = {label: value.name, value: value.id, children:[]};

    // 第二级
    if (value.secondCateList) {
      value.secondCateList.map(secondVal => {
        let secondItem = {label: secondVal.name, value: secondVal.id, children: []}

        if (secondVal.thirdCateList) {
          // 遍历第三级别
          secondVal.thirdCateList.map(thirdVal => {
            let thirdItem = {label: thirdVal.name, value: thirdVal.id, children: []}
            if (thirdVal.cropInfoList) {
              // 遍历农作物列表
              thirdVal.cropInfoList.map(cropVal => {
                thirdItem.children.push({label: cropVal.name, value: cropVal.id})
              })
            }
            secondItem.children.push(thirdItem);
          })
        }
        item.children.push(secondItem);
      })
    }
    result.push(item);
  });
  return result;
}

export function apiCropGetList() {
  return new Promise(((resolve, reject) => {
    get('portal/crop/cropGet.do').then(res => {
      // 数据转换，转换为符合级联格式的数据格式
      if (res) {
        res = convertType(res);
      }
      resolve(res);
    }).catch(err => {
      console.error('error', err);
      reject(err);
    })
  }))
}
