import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes = [
  {
    path: '/',
    name: "home",
    component: () => import(/* webpackChunkName: "about" */ '../views/home/index.vue')
  },
  {
    path: '/addLayer',
    name: "AddLayer",
    component: () => import(/* webpackChunkName: "about" */ '../views/addLayer/index.vue')
  },
  {
    path: '/tool',
    name: "Tool",
    component: () => import(/* webpackChunkName: "about" */ '../views/tool/index.vue')
  },
  {
    path: '/exportImage',
    name: "ExportImage",
    component: () => import(/* webpackChunkName: "about" */ '../views/exportImage/index.vue')
  },
  // {
  //   path: '/home',
  //   name: 'home',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/home/index.vue')
  // }
]

const router = createRouter({
  // history 模式:createWebHistory(),hash模式:createWebHashHistory()
  history: createWebHashHistory(),
  routes
})

export default router
