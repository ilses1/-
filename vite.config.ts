import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'

// 按需导入组件
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

// 导入svg处理插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', //import.meta.env.BASE_URL默认为斜杠
  plugins: [
    vue({
      reactivityTransform: true
    }),
    // 默认自动加载components文件夹下的组件
    Components({
      // 默认为true 开启自动生成组件的类型声明文件
      dts: false,
      // 在main.ts中已经引入了所有样式,不需要自动导入,只需要自动导入组件即可
      resolvers: [VantResolver({ importStyle: false })]
    }),
    // 打包svg
    createSvgIconsPlugin({
      // 指定svg图标目录
      iconDirs: [path.resolve(process.cwd(), 'src/icons')]
    }),
    createHtmlPlugin()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
