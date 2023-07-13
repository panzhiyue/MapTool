
const router = [
    {
        path: '/addLayer',
        name: "AddLayer",
        component: () => import(/* webpackChunkName: "about" */ '@/views/mapTool/addLayer/index.vue')
    },
    {
        path: '/toolbox',
        name: "Toolbox",
        component: () => import(/* webpackChunkName: "about" */ '@/views/mapTool/toolbox/index.vue')
    },
    {
        path: '/exportImage',
        name: "ExportImage",
        component: () => import(/* webpackChunkName: "about" */ '@/views/mapTool/exportImage/index.vue')
    },
    {
        path: '/exportVector',
        name: "ExportVector",
        component: () => import(/* webpackChunkName: "about" */ '@/views/mapTool/exportVector/index.vue')
    },
    {
        path: '/exportAttributeTable',
        name: "ExportAttributeTable",
        component: () => import(/* webpackChunkName: "about" */ '@/views/mapTool/exportAttributeTable/index.vue')
    },
    {
        path: '/exportKneePointTable',
        name: "ExportKneePointTable",
        component: () => import(/* webpackChunkName: "about" */ '@/views/mapTool/exportKneePointTable/index.vue')
    },

    {
        path: '/attributeTable',
        name: "AttributeTable",
        component: () => import(/* webpackChunkName: "about" */ '@/views/mapTool/attributeTable/index.vue')
    },
    {
        path: '/addColumn',
        name: "AddColumn",
        component: () => import(/* webpackChunkName: "about" */ '@/views/mapTool/addColumn/index.vue')
    },
    {
        path: '/editColumn',
        name: "EditColumn",
        component: () => import(/* webpackChunkName: "about" */ '@/views/mapTool/editColumn/index.vue')
    },
    {
        path: '/fieldCalculator',
        name: "FieldCalculator",
        component: () => import(/* webpackChunkName: "about" */ '@/views/mapTool/fieldCalculator/index.vue')
    },
    {
        path: '/computationalGeometry',
        name: "ComputationalGeometry",
        component: () => import(/* webpackChunkName: "about" */ '@/views/mapTool/computationalGeometry/index.vue')
    },
    {
        path: '/xy',
        name: "XY",
        component: () => import(/* webpackChunkName: "about" */ '@/views/mapTool/xy/index.vue')
    },
    {
        path: '/measure',
        name: "Measure",
        component: () => import(/* webpackChunkName: "about" */ '@/views/mapTool/measure/index.vue')
    },
    {
        path: '/plot',
        name: "Plot",
        component: () => import(/* webpackChunkName: "about" */ '@/views/mapTool/plot/index.vue')
    },
    {
        path: '/coordinateConversion',
        name: "CoordinateConversion",
        component: () => import(/* webpackChunkName: "about" */ '@/views/mapTool/coordinateConversion/index.vue')
    },
    {
        path: '/style',
        name: "Style",
        component: () => import(/* webpackChunkName: "about" */ '@/views/mapTool/style/index.vue')
    },
    {
        path: '/createDistanceTable',
        name: "CreateDistanceTable",
        component: () => import(/* webpackChunkName: "about" */ '@/views/mapTool/createDistanceTable/index.vue')
    },
    {
        path: '/geometryConversion',
        name: "GeometryConversion",
        component: () => import(/* webpackChunkName: "about" */ '@/views/mapTool/geometryConversion/index.vue')
    },
    {
        path: '/geometryConversionBatch',
        name: "GeometryConversionBatch",
        component: () => import(/* webpackChunkName: "about" */ '@/views/mapTool/geometryConversionBatch/index.vue')
    },
    {
        path: '/coordinateSystem',
        name: "CoordinateSystem",
        component: () => import(/* webpackChunkName: "about" */ '@/views/mapTool/coordinateSystem/index.vue')
    },
    {
        path: '/tdt/geocoder',
        name: "TdtGeocoder",
        component: () => import(/* webpackChunkName: "about" */ '@/views/mapTool/tdt/geocoder/index.vue')
    },
    {
        path: '/tdt/reverseGeocoder',
        name: "TdtReverseGeocoder",
        component: () => import(/* webpackChunkName: "about" */ '@/views/mapTool/tdt/reverse-geocoder/index.vue')
    },
    {
        path: '/tdt/administrative',
        name: "TdtAdministrative",
        component: () => import(/* webpackChunkName: "about" */ '@/views/mapTool/tdt/administrative/index.vue')
    },
]

export default router;