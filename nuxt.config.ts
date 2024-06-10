// https://nuxt.com/docs/api/configuration/nuxt-config

//引入ant-design-vue模块
import Components from 'unplugin-vue-components/vite'
//引入unplugin-vue-components模块
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
//引入unplugin-icons模块
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig:{
    //私密
    SecretId: process.env.SecretId, 
    SecretKey: process.env.SecretKey, 
    public:{

    }
  },
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
          }),
          IconsResolver({
            prefix:'i',
            enabledCollections:['ep','ant-design','mdi','ph','ion']
          })
        ]
      }),
      Icons({
        autoInstall: true,
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
