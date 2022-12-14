import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import 'ant-design-vue/dist/antd.css'
import 'virtual:windi.css'
import Vue2ol from '@gis-js/vue2ol'
import Vue2olExtend from '@gis-js/vue2ol-extend'
import '@/styles/index.less'
import "ol/ol.css"

// import ElementPlus from "@/utils/element-plus.ts"
// import 'element-plus/dist/index.css'
import Directive from './directives/index'
import { VueColor } from 'vue-color-next'
import '../node_modules/vue-color-next/dist/index.css'

import unhandled from "@/utils/unhandled.ts"
unhandled({
  logger: (error) => {
    console.error(error)
  },
  showDialog: true,
  reportButton: (error) => {
    console.log("Report Button Initialized");
  }
});

// unhandled.logError(Error, {
//   title: 'Title of the Box'
// })


const store = createPinia()

createApp(App).use(router).use(store)
  .use(Vue2ol)
  .use(Vue2olExtend).use(Directive).use(VueColor)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })


