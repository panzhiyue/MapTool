import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

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
    path: '/home',
    name: "home",
    component: () => import(/* webpackChunkName: "about" */ '../views/mapTool/home/index.vue')
  },

  {
    path: '/addLayer',
    name: "AddLayer",
    component: () => import(/* webpackChunkName: "about" */ '../views/mapTool/addLayer/index.vue')
  },
  {
    path: '/toolbox',
    name: "Toolbox",
    component: () => import(/* webpackChunkName: "about" */ '../views/mapTool/toolbox/index.vue')
  },
  {
    path: '/exportImage',
    name: "ExportImage",
    component: () => import(/* webpackChunkName: "about" */ '../views/mapTool/exportImage/index.vue')
  },
  {
    path: '/exportVector',
    name: "ExportVector",
    component: () => import(/* webpackChunkName: "about" */ '../views/mapTool/exportVector/index.vue')
  },
  {
    path: '/exportAttributeTable',
    name: "ExportAttributeTable",
    component: () => import(/* webpackChunkName: "about" */ '../views/mapTool/exportAttributeTable/index.vue')
  },
  {
    path: '/exportKneePointTable',
    name: "ExportKneePointTable",
    component: () => import(/* webpackChunkName: "about" */ '../views/mapTool/exportKneePointTable/index.vue')
  },

  {
    path: '/attributeTable',
    name: "AttributeTable",
    component: () => import(/* webpackChunkName: "about" */ '../views/mapTool/attributeTable/index.vue')
  },
  {
    path: '/addColumn',
    name: "AddColumn",
    component: () => import(/* webpackChunkName: "about" */ '../views/mapTool/addColumn/index.vue')
  },
  {
    path: '/editColumn',
    name: "EditColumn",
    component: () => import(/* webpackChunkName: "about" */ '../views/mapTool/editColumn/index.vue')
  },
  {
    path: '/fieldCalculator',
    name: "FieldCalculator",
    component: () => import(/* webpackChunkName: "about" */ '../views/mapTool/fieldCalculator/index.vue')
  },
  {
    path: '/computationalGeometry',
    name: "ComputationalGeometry",
    component: () => import(/* webpackChunkName: "about" */ '../views/mapTool/computationalGeometry/index.vue')
  },
  {
    path: '/xy',
    name: "XY",
    component: () => import(/* webpackChunkName: "about" */ '../views/mapTool/xy/index.vue')
  },
  {
    path: '/measure',
    name: "Measure",
    component: () => import(/* webpackChunkName: "about" */ '../views/mapTool/measure/index.vue')
  },
  {
    path: '/plot',
    name: "Plot",
    component: () => import(/* webpackChunkName: "about" */ '../views/mapTool/plot/index.vue')
  },
  {
    path: '/coordinateConversion',
    name: "CoordinateConversion",
    component: () => import(/* webpackChunkName: "about" */ '../views/mapTool/coordinateConversion/index.vue')
  },
  {
    path: '/style',
    name: "Style",
    component: () => import(/* webpackChunkName: "about" */ '../views/mapTool/style/index.vue')
  },
  {
    path: '/createDistanceTable',
    name: "CreateDistanceTable",
    component: () => import(/* webpackChunkName: "about" */ '../views/mapTool/createDistanceTable/index.vue')
  },
  {
    path: '/geometryConversion',
    name: "GeometryConversion",
    component: () => import(/* webpackChunkName: "about" */ '../views/mapTool/geometryConversion/index.vue')
  },
  {
    path: '/geometryConversionBatch',
    name: "GeometryConversionBatch",
    component: () => import(/* webpackChunkName: "about" */ '../views/mapTool/geometryConversionBatch/index.vue')
  },
  {
    path: '/coordinateSystem',
    name: "CoordinateSystem",
    component: () => import(/* webpackChunkName: "about" */ '../views/mapTool/coordinateSystem/index.vue')
  },
  {
    path: '/electronApi',
    name: "ElectronApi",
    component: () => import(/* webpackChunkName: "about" */ '../views/electronApi/index.vue')
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
]

const router = createRouter({
  // history 模式:createWebHistory(),hash模式:createWebHashHistory()
  history: createWebHashHistory(),
  routes
})

export default router
