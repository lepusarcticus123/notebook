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
    const token = useCookie('token')
    //添加请求头和token
    const headers = {
        ...opt.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
    opt.headers = headers

    return useFetch(url, {
        ...opt,
        baseURL: '',//基本url
        onRequest({ request, options }) {
          //处理请求数据
            console.log('request',request)
          },
          onRequestError({ request, options, error }) {
            // 处理请求错误
            console.log('request',request)
            //未登录401
            
          },
          onResponse({ request, response, options }) {
            // 处理响应数据
            console.log('request',request)
          },
          onResponseError({ request, response, options }) {
            // 处理响应错误
            console.log('request',request)
          }
    })
}
//定义接口
export const userInfoFetch=(opt:myFetchOptions)=>{
    return useHttpFetch('/user/info',opt)
}