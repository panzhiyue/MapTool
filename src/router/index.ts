import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const modules: any = import.meta.globEager('./modules/*.ts');
const routeModuleList = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});
const routes = [
  // {
  //   path: '/',
  //   name: "home",
  //   redirect: "/login"
  // },
  {
    path: '/',
    name: "Login",
    component: () => import(/* webpackChunkName: "about" */ '../views/login/index.vue')
  },


  {
    path: '/modelSelect',
    name: "ModelSelect",
    component: () => import(/* webpackChunkName: "about" */ '../views/modelSelect/index.vue')
  },
  // {
  //   path: '/home',
  //   name: 'home',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/home/index.vue')
  // }
  ...routeModuleList
]

const router = createRouter({
  // history 模式:createWebHistory(),hash模式:createWebHashHistory()
  history: createWebHashHistory(),
  routes
})

export default router
