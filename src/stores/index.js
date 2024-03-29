// reference: iceStores https://ice.work/docs/guide/dev/store#%E9%AB%98%E7%BA%A7%E7%94%A8%E6%B3%95

import user from './user.js'
import Icestore from '@ice/store'
import option from "@/stores/option";

const icestore = new Icestore();
// 注册user
icestore.registerStore('user', user);
icestore.registerStore('option', option)
export default icestore;
