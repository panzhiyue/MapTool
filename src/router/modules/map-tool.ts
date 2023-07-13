
const router = [
    {
        path: '/home',
        name: "home",
        component: () => import(/* webpackChunkName: "about" */ '@/views/mapTool/home/index.vue')
    },
]

export default router;