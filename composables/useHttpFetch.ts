import { callWithNuxt } from "#app"
//typeScript的接口的定义
interface myFetchOptions {
  //它指定了请求头的类型(可选)
  headers?: Record<string, string>
  //这是一个索引签名，它允许 myFetchOptions 接口中具有任意数量的其他属性，
  //并且这些属性的类型可以是任意的。
  [key: string]: any
}
//useHttpFetch 自定义 Hook
export const useHttpFetch = (url: string, opt: myFetchOptions) => {
  //token
  const accessToken = useCookie('accessToken')
  //添加请求头和token
  const headers = {
    ...opt.headers,
    ...(accessToken.value ? { Authorization: `Bearer ${accessToken.value}` } : {})
  }
  opt.headers = headers

  const nuxtApp = useNuxtApp()

  return useFetch(url, {
    ...opt,
    baseURL: 'http://localhost:3000/',//基本url
    onRequest({ request, options }) {
      //处理请求数据
      console.log('request', request)
    },
    onRequestError({ request, options, error }) {
      // 处理请求错误
      console.log('error', error)
    },
    onResponse({ request, response, options }) {
      // 处理响应数据
      console.log('request', request)
    },
    onResponseError: async ({ request, response, options }) => {
      // 处理响应错误
      console.log('response', response)
      //未登录401状态
        if (response.status === 401) {
          await callWithNuxt(nuxtApp,navigateTo,[
            "/login",
            {replace:true,redirectCode:401}
        ])
          // navigateTo('/login')
        } else if (response.status === 500) {
          console.log('服务器错误')
        }
      }
    })
}
//定义接口
export const userInfoFetch = (opt: myFetchOptions) => {
  return useHttpFetch('/user/info', opt)
}
//注册接口
export const registerFetch = (opt: myFetchOptions) => {
  return useHttpFetch('/api/auth/register', opt)
}
//登录接口
export const loginFetch = (opt: myFetchOptions) => {
  return useHttpFetch('/api/auth/login', opt)
}
//文集接口
export const notebookFetch = (opt: myFetchOptions) => {
  return useHttpFetch('/api/note/notebook', opt)
}
