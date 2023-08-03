

import Layout from "@/views/electronApi/Layout.vue"
import Menu from "@/views/electronApi/Menu.vue"
const router = [
    {
        path: '/electronApiT/os/subwindow',
        name: 'ElectronTApiOsSubwindow'
    },
    {
        path: '/electronApi',
        component: Layout,
        children: [
            {
                path: '/electronApi/framework',
                name: 'ElectronApiFramework',
                component: Menu,
                props: { id: 'framework' },
                redirect: { name: 'ElectronApiFrameworkSocketIpc' },
                children: [
                    {
                        path: '/electronApi/framework/socket/ipc',
                        name: 'ElectronApiFrameworkSocketIpc',
                        component: () => import('@/views/electronApi/framework/socket/Ipc.vue')
                    },
                    {
                        path: '/electronApi/framework/software',
                        name: 'ElectronApiFrameworkSoftware',
                        component: () => import('@/views/electronApi/framework/software/index.vue')
                    },
                    {
                        path: '/electronApi/framework/updater',
                        name: 'ElectronApiFrameworkUpdater',
                        component: () => import('@/views/electronApi/framework/updater/index.vue')
                    },

                ]
            },

            {
                path: '/electronApi/hardware',
                name: 'ElectronApiHardware',
                component: Menu,
                props: { id: 'hardware' },
                redirect: { name: 'ElectronApiHardwarePrinter' },
                children: [
                    {
                        path: '/electronApi/hardware/printer',
                        name: 'ElectronApiHardwarePrinter',
                        component: () => import('@/views/electronApi/hardware/printer/index.vue')
                    },
                ]
            },
            {
                path: '/electronApi/effect',
                name: 'ElectronApiEffect',
                component: Menu,
                props: { id: 'effect' },
                redirect: { name: 'ElectronApiEffectVideo' },
                children: [
                    {
                        path: '/electronApi/effect/video',
                        name: 'ElectronApiEffectVideo',
                        component: () => import('@/views/electronApi/effect/video/index.vue')
                    },
                ]
            },
            {
                path: '/electronApi/os',
                name: 'ElectronApiOs',
                component: Menu,
                props: { id: 'os' },
                redirect: { name: 'ElectronApiOsFile' },
                children: [
                    {
                        path: '/electronApi/os/file',
                        name: 'ElectronApiOsFile',
                        component: () => import('@/views/electronApi/os/file/index.vue')
                    },
                    {
                        path: '/electronApi/os/windowview',
                        name: 'ElectronApiOsWindowview',
                        component: () => import('@/views/electronApi/os/windowview/index.vue')
                    },
                    {
                        path: '/electronApi/os/window',
                        name: 'ElectronApiOsWindow',
                        component: () => import('@/views/electronApi/os/window/index.vue')
                    },
                    {
                        path: '/electronApi/os/notification',
                        name: 'ElectronApiOsNotification',
                        component: () => import('@/views/electronApi/os/notification/index.vue')
                    },
                    {
                        path: '/electronApi/os/powermonitor',
                        name: 'ElectronApiOsPowerMonitor',
                        component: () => import('@/views/electronApi/os/powermonitor/index.vue')
                    },
                    {
                        path: '/electronApi/os/screen',
                        name: 'ElectronApiOsScreen',
                        component: () => import('@/views/electronApi/os/screen/index.vue')
                    },
                ]
            },

        ]
    }];

export default router;