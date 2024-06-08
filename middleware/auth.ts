//to: 表示目标路由对象，包含了即将跳转到的路由的信息。
//from: 表示当前路由对象，包含了当前路由的信息。
export default defineNuxtRouteMiddleware((to,from)=>{
    //判断用户是否登录
    let user =true;
    if(!user){
        //navigateTo 函数是 Nuxt.js 中用于导航到指定路由的函数。
        return navigateTo('/login')
    }
})