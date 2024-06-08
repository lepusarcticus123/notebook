import {getDB} from "~/server/utils/db/mysql"
//使用 defineEventHandler 定义一个异步事件处理程序。
export default defineEventHandler(async()=>{
const [rows,fields]=await getDB().query('SELECT * FROM users');
console.log('users',rows)
})