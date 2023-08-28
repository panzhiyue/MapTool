

import Layout from "@/views/webmaster-tools/layout/index.vue"
// import Menu from "@/views/electronApi/Menu.vue"
const router =
{
    path: '/webmaster-tools',
    component: Layout,
    children: [
        {
            path: '/webmaster-tools/calculation-baseperiod',
            name: 'WebmastertoolsCalculationbaseperiod',
            component: () => import('@/views/webmaster-tools/calculation-baseperiod/index.vue')
        },
        {
            path: '/webmaster-tools/percentile/recite',
            name: 'WebmastertoolsPercentileRecite',
            component: () => import('@/views/webmaster-tools/percentile/recite.vue')
        },
        {
            path: '/webmaster-tools/math/formula',
            name: 'WebmastertoolsMathFormula',
            component: () => import('@/views/webmaster-tools/math/formula.vue')
        },
        {
            path: '/webmaster-tools/information/formula',
            name: 'WebmastertoolsInformationFormula',
            component: () => import('@/views/webmaster-tools/information/formula.vue')
        },
        {
            path: '/webmaster-tools/graffiti-board',
            name: 'WebmastertoolsGraffitiboard',
            component: () => import('@/views/webmaster-tools/graffiti-board/index.vue')
        },

    ]
};

export default router;