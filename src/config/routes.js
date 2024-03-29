import BasicLayout from '@/layouts/BasicLayout';
import UserLayout from '@/layouts/UserLayout';

import UserLogin from '@/pages/UserLogin';
import UserRegister from '@/pages/UserRegister';
import Dashboard from '@/pages/Dashboard';
import MySetting from '@/pages/MySetting';
import InputStock from '@/pages/Input/Stock';
import AddStock from '@/pages/Input/AddStock';
import InputRecord from '@/pages/Input/Record';

import Field from '@/pages/Product/Field';
import NotFound from '@/pages/NotFound';
import Record from '@/pages/Product/Record';
import Pick from '@/pages/Product/Pick';
import Root from '@/pages/Root/Root'
import Audit from '@/pages/Input/Audit'

const routerConfig = [
  {
    path: '/user',
    component: UserLayout,
    children: [
      { path: '/login', component: UserLogin },
      { path: '/register', component: UserRegister },
      { path: '/', redirect: '/user/login' },
      { component: NotFound },
    ],
  },
  {
    path: '/',
    component: BasicLayout,
    children: [
      { path: '/dashboard', component: Dashboard },
      { path: '/input/list', component: InputStock },
      { path: '/input/record', component: InputRecord },
      { path: '/input/add', component: AddStock },
      {path: '/input/audit', component: Audit},
      { path: '/product/field', component: Field },
      { path: '/setting/my', component: MySetting },
      { path: '/product/record', component: Record },
      { path: '/product/pick', component: Pick },
      { path: '/root/root', component: Root},
      { path: '/', redirect: '/dashboard' },
      { component: NotFound },
    ],
  },
];

export default routerConfig;
