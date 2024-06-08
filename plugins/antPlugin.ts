import 'ant-design-vue/es/message/style/index'
import 'ant-design-vue/es/notification/style/index'
import { message ,notification } from 'ant-design-vue';
export default defineNuxtPlugin(nuxtApp => {
 return {
 //⾃动提供辅助函数
 provide: {
 message: message,
 notification: notification
 }
 }
})