// 菜单配置
// headerMenuConfig：头部导航配置

const headerMenuConfig = [
  { name: '首页', path: '/', icon: 'home', id: 'Menu_f0rlm' },
  {
    name: '反馈',
    path: 'https://github.com/alibaba/ice',
    external: true,
    newWindow: true,
    icon: 'message',
    id: 'Menu_1ufua',
  },

  {
    name: '帮助',
    path: 'https://alibaba.github.io/ice',
    external: true,
    newWindow: true,
    icon: 'bangzhu',
    id: 'Menu_tdlwq',
  },
];

// asideMenuConfig：侧边导航配置

const asideMenuConfig = [
  { name: '采摘管理', path: '/record/pick', id: 'Menu_1heg1' },
  {
    name: '首页',
    path: '/',
    icon: 'home',
    children: [{ name: '数据概况', path: '/dashboard', id: 'Menu_eqf01' }],
    id: 'Menu_9wcis',
  },
  {
    name: '投入品管理',
    path: '/input',
    icon: 'anchor',
    children: [
      { name: '库存', path: '/input/list', id: 'Menu_jn70o', children: [] },
      { name: '记录', path: '/input/record', id: 'Menu_9yuy3' },
      { name: '新增库存', path: '/input/add', id: 'Menu_ad0r9' },
    ],
    id: 'Menu_mat6x',
  },
  { children: [], name: '产品管理', icon: 'shop', id: 'Menu_j3pk5' },
  {
    name: '生产管理',
    path: '/topic',
    icon: 'publish',
    children: [
      { name: '记录', path: '/product/record', id: 'Menu_ohod8' },
      { name: '田块管理', path: '/product/field', id: 'Menu_y1bnw' },
      { name: '采摘管理', path: '/product/pick', id: 'Menu_y1nw' },
    ],
    id: 'Menu_t0meg',
  },
  { name: '溯源管理', icon: 'backward', id: 'Menu_bd1s0' },
  {
    name: '基本设置',
    path: '/setting',
    icon: 'yonghu',
    children: [{ name: '个人设置', path: '/setting/my', id: 'Menu_pyl4i' }],
    id: 'Menu_6gdi3',
  },
];

export { headerMenuConfig, asideMenuConfig };
