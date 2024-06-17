import { callWithNuxt } from "#app"

interface myFetchOptions {
  headers?: Record<string, string>
  [key: string]: any
}
const getBaseUrl=()=>{
  let baseURL='';
  if(process.env.NODE_ENV === 'production'){
    //生产环境
    if(process.server){
      //SSR请求内网
      baseURL='http://127.0.0.1:3000/'
    }else{
      //客户端请求外网
      baseURL='http://jbook.XXX.com/'
    }
    return baseURL
  }
  else if(process.env.NODE_ENV === 'development'){
    //本地开发环境
    baseURL='http://127.0.0.1:3000/'
  }
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
    // baseURL: 'http://localhost:3000/',//基本url
    baseURL:getBaseUrl(),
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
//获取文章
export const notesFetch = (opt: myFetchOptions) => {
  return useHttpFetch('/api/note/notes', opt)
}
//文章接口
export const noteFetch = (opt: myFetchOptions) => {
  return useHttpFetch('/api/note/note', opt)
}
//文章图片上传腾讯云
export const cosAuthFetch = (opt: myFetchOptions) => {
  return useHttpFetch('/api/cos/auth', opt)
}
//获取文章列表
export const homeNotesFetch = (opt: myFetchOptions) => {
  return useHttpFetch('/api/home/notes', opt)
}
//获取文章详情
export const noteDetailFetch = (opt: myFetchOptions) => {
  return useHttpFetch('/api/home/detail', opt)
}
//上传头像
export const uploadCosFetch = (opt: myFetchOptions) => {
  return useHttpFetch('/api/uploadCos', opt)
}