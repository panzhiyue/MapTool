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
    path: '/toolbox',
    name: "Toolbox",
    component: () => import(/* webpackChunkName: "about" */ '../views/toolbox/index.vue')
  },
  {
    path: '/exportImage',
    name: "ExportImage",
    component: () => import(/* webpackChunkName: "about" */ '../views/exportImage/index.vue')
  },
  {
    path: '/exportVector',
    name: "ExportVector",
    component: () => import(/* webpackChunkName: "about" */ '../views/exportVector/index.vue')
  },
  {
    path: '/exportAttributeTable',
    name: "ExportAttributeTable",
    component: () => import(/* webpackChunkName: "about" */ '../views/exportAttributeTable/index.vue')
  },
  {
    path: '/attributeTable',
    name: "AttributeTable",
    component: () => import(/* webpackChunkName: "about" */ '../views/attributeTable/index.vue')
  },
  {
    path: '/addColumn',
    name: "AddColumn",
    component: () => import(/* webpackChunkName: "about" */ '../views/addColumn/index.vue')
  },
  {
    path: '/editColumn',
    name: "EditColumn",
    component: () => import(/* webpackChunkName: "about" */ '../views/editColumn/index.vue')
  },
  {
    path: '/fieldCalculator',
    name: "FieldCalculator",
    component: () => import(/* webpackChunkName: "about" */ '../views/fieldCalculator/index.vue')
  },
  {
    path: '/computationalGeometry',
    name: "ComputationalGeometry",
    component: () => import(/* webpackChunkName: "about" */ '../views/computationalGeometry/index.vue')
  },
  {
    path: '/xy',
    name: "XY",
    component: () => import(/* webpackChunkName: "about" */ '../views/xy/index.vue')
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
