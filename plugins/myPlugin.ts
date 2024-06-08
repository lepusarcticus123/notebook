export default defineNuxtPlugin((nuxtApp)=>{
    return{
        provide:{
            //插件名和他可以接收的参数
            myPlugin:(msg:string)=>`hello ${msg}`
        }
    }
})