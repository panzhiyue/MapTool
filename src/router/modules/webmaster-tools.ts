

import Layout from "@/views/webmaster-tools/layout/index.vue"
// import Menu from "@/views/electronApi/Menu.vue"
const router =
{
    path: '/webmaster-tools',
    component: Layout,
    children: [
        {
            path: '/webmaster-tools/rapid-calculation',
            name: 'WebmastertoolsRapidcalculation',
            component: () => import('@/views/webmaster-tools/rapid-calculation/index.vue')
        },
    ]
};

export default router;