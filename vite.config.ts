import { rmSync } from 'fs'
import path from 'path'
import { UserConfigExport, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron, { onstart } from 'vite-plugin-electron'
import pkg from './package.json'
import WindiCSS from 'vite-plugin-windicss'
import { viteCommonjs, esbuildCommonjs } from "@originjs/vite-plugin-commonjs";
import Components from 'unplugin-vue-components/vite'
import {
  AntDesignVueResolver
} from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import { viteMockServe } from 'vite-plugin-mock'

rmSync('dist', { recursive: true, force: true }) // v14.14.0

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    define: {
      __static: `"${path.join(__dirname, './static').replace(/\\/g, '\\\\')}"`
    },
    plugins: [

      vue(),
      // 
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'vue-i18n',
          '@vueuse/core'
        ]
      }),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: 'less', // 一定要开启这个配置项
          }),
        ],
      }),

      WindiCSS(),
      viteCommonjs({
        include: ['/node_modules']
      }),
      viteMockServe({
        mockPath: 'db/controller', // 设置模拟.ts 文件的存储文件夹
        localEnabled: command === 'serve', // 设置是否启用本地 xxx.ts 文件，不要在生产环境中打开它.设置为 false 将禁用 mock 功能
      }),
      electron({
        main: {
          entry: 'electron/main/index.ts',
          vite: {
            build: {
              // For Debug
              sourcemap: true,
              outDir: 'dist/electron/main',
            },
            // Will start Electron via VSCode Debug
            plugins: [process.env.VSCODE_DEBUG ? onstart() : null],
          },
        },
        preload: {
          input: {
            // You can configure multiple preload here
            index: path.join(__dirname, 'electron/preload/index.ts'),
          },
          vite: {
            build: {
              // For Debug
              sourcemap: 'inline',
              outDir: 'dist/electron/preload',
            },
          },
        },
        // Enables use of Node.js API in the Renderer-process
        // https://github.com/electron-vite/vite-plugin-electron/tree/main/packages/electron-renderer#electron-renderervite-serve
        renderer: {},
      }),
    ],
    optimizeDeps: {
      esbuildOptions: {
        plugins: [
          esbuildCommonjs(['ant-design-vue'])
        ],
      },
    },
    resolve: {
      //设置路径别名
      alias: {
        '@': path.resolve(__dirname, './src')
      },
      extensions: ['.ts', '.js', '.json', '.mjs',".vue"],
    },

    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: { // 在这里自定义主题色等样式
            'primary-color': '#1da57a',
            'link-color': '#1da57a',
            'border-radius-base': '2px',
          },
        },
      },
    },
    server: process.env.VSCODE_DEBUG ? {
      host: pkg.debug.env.VITE_DEV_SERVER_HOSTNAME,
      port: pkg.debug.env.VITE_DEV_SERVER_PORT
    } : undefined,
  }
}
