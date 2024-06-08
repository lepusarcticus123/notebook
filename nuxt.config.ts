// https://nuxt.com/docs/api/configuration/nuxt-config

//引入ant-design-vue模块
import Components from 'unplugin-vue-components/vite'
//引入unplugin-vue-components模块
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
export default defineNuxtConfig({
  devtools: { enabled: true },
  //配置模块
  modules:['@pinia/nuxt','@pinia-plugin-persistedstate/nuxt'],
  //配置vite
  vite: {
    plugins: [
      Components({
        //按需引入组件
        resolvers: [
          AntDesignVueResolver({
            importStyle: 'less', // css in less
          })
        ],
      })
    ],
    //配置css
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            // 'primary-color': '#ea6f5a'
          },
          javascriptEnabled: true,
        }
      },
    },
    //外部组件不参与打包
    ssr: {
      noExternal: ['@ant-design-vue']
    }
  }
})
