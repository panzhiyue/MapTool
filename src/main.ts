import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
// import AntD from 'ant-design-vue/es/index'
import 'ant-design-vue/dist/antd.css'
import 'virtual:windi.css'
// import Vue2ol from '@gis-js/vue2ol'
// import Vue2olExtend from '@gis-js/vue2ol-extend'
// import ElementPlus from "@/utils/element-plus.ts"
// import 'element-plus/dist/index.css'





const store = createPinia()

createApp(App).use(router).use(store)
  // .use(ElementPlus)
  // .use(sotre).use(DatePicker)
  // .use(AntD)
  // .use(Vue2ol)
  // .use(Vue2olExtend)
  .mount('#app')
  .$nextTick(() => {
    // postMessage({ payload: 'removeLoading' }, '*')
  })
