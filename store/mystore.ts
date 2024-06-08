import {defineStore} from "pinia";
//向外暴露出useMyStore函数
//函数的第一个参数是他的id
export const useMyStore =defineStore('mystore',{
    //初始状态
    state:()=>({
        counter:1,
        token:520
    }),
    //计算属性
    getters:{
        doubleCounter:(state)=>state.counter*2
    },
    //方法
    //执行异步操作、提交 mutations 或改变 store 的状态。
    actions:{
        add(){
            this.counter++
        }
    },
    persist: {
        storage: persistedState.cookiesWithOptions({
            sameSite:'strict'
        }),
        paths:['tokens'],
      },
})