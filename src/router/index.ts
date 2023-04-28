import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes = [
  // {
  //   path: '/',
  //   name: "home",
  //   redirect: "/login"
  // },
  {
    path: '/home',
    name: "home",
    component: () => import(/* webpackChunkName: "about" */ '../views/home/index.vue')
  },
  {
    path: '/',
    name: "Login",
    component: () => import(/* webpackChunkName: "about" */ '../views/login/index.vue')
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
    path: '/exportKneePointTable',
    name: "ExportKneePointTable",
    component: () => import(/* webpackChunkName: "about" */ '../views/exportKneePointTable/index.vue')
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
  {
    path: '/measure',
    name: "Measure",
    component: () => import(/* webpackChunkName: "about" */ '../views/measure/index.vue')
  },
  {
    path: '/plot',
    name: "Plot",
    component: () => import(/* webpackChunkName: "about" */ '../views/plot/index.vue')
  },
  {
    path: '/coordinateConversion',
    name: "CoordinateConversion",
    component: () => import(/* webpackChunkName: "about" */ '../views/coordinateConversion/index.vue')
  },
  {
    path: '/style',
    name: "Style",
    component: () => import(/* webpackChunkName: "about" */ '../views/style/index.vue')
  },
  {
    path: '/createDistanceTable',
    name: "CreateDistanceTable",
    component: () => import(/* webpackChunkName: "about" */ '../views/createDistanceTable/index.vue')
  },
  {
    path: '/geometryConversion',
    name: "GeometryConversion",
    component: () => import(/* webpackChunkName: "about" */ '../views/geometryConversion/index.vue')
  },
  {
    path: '/geometryConversionBatch',
    name: "GeometryConversionBatch",
    component: () => import(/* webpackChunkName: "about" */ '../views/geometryConversionBatch/index.vue')
  },
  {
    path: '/coordinateSystem',
    name: "CoordinateSystem",
    component: () => import(/* webpackChunkName: "about" */ '../views/coordinateSystem/index.vue')
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
