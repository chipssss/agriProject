import {apiCropGetSelectOptionList} from "@/api/product/crop";

// 选择项常量的内存缓存
export default {
  cropList: [],

  async init() {
    if (this.cropList.length === 0) {
      // 请求数据
      // this.cropList = await new Promise(resolve => {
      //   apiCropGetList().then(res => resolve(res))
      //     .catch(err => console.error('errors', err))
      // });

    }
  },

  setCropList(cropList) {
    this.cropList = cropList;
  }
}
